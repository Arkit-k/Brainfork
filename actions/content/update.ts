"use server"

import  prisma  from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getUser } from "../getUser"
import { ContentSchemas } from "@/schema/index"

export async function updateContent(contentId: number, formData: FormData) {
  const user = await getUser()

  const rawData = {
    title: formData.get("title"),
    link: formData.get("link"),
    description: formData.get("description"),
    tags: formData.get("tags")?.toString().split(",").map(t => t.trim()) || []
  }

  const parsed = ContentSchemas.partial().parse(rawData) 
  // partial() → all fields optional for update

  const updated = await prisma.contentSchema.update({
    where: { contentId, userId: user.id },
    data: {
      ...parsed,
      tags: parsed.tags
        ? {
            set: [],
            connectOrCreate: parsed.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag }
            }))
          }
        : undefined
    },
    include: { tags: true }
  })

  revalidatePath("/dashboard")
  return updated
}
