// src/actions/content/create.ts
"use server"

import  prisma  from "@/lib/db"
import { auth } from "@/auth"
import { ContentSchemas } from "@/schema/index"
import { z } from "zod"

export async function createContent(data: z.infer<typeof ContentSchemas>) { // 👈 this is fine
  const session = await auth()
  if (!session?.user?.email) throw new Error("Unauthorized")

  const parsed = ContentSchemas.parse(data)

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })
  if (!user) throw new Error("User not found")

  return await prisma.contentSchema.create({
    data: {
      userId: user.id,
      title: parsed.title,
      link: parsed.link,
      discription: parsed.discription,
      type: parsed.type,
      tags: {
        connectOrCreate: parsed.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: { tags: true },
  })
}



