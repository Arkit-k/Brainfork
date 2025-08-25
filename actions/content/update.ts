"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getUser } from "../getUser"
import { ContentSchemas } from "@/schema/index"

export async function updateContent(contentId: number, formData: FormData) {
  const user = await getUser()

  const rawData = {
    title: formData.get("title") as string,
    link: formData.get("link") as string,
    description: formData.get("description") as string,
    tags:
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((t) => t.trim()) || [],
    type: (formData.get("type") as string | null)?.toUpperCase() as
      | "NOTION"
      | "TWITTER"
      | "YOUTUBE"
      | "NOTES"
      | undefined,
  }

  // partial() → all fields optional for update
  const parsed = ContentSchemas.partial().parse(rawData)

  const updated = await prisma.contentSchema.update({
    where: { contentId, userId: user.id },
    data: {
      ...parsed,
      tags: parsed.tags
        ? {
            set: [], // clear old tags first
            connectOrCreate: parsed.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          }
        : undefined,
    },
    include: { tags: true },
  })

  revalidatePath("/dashboard")
  return updated
}

