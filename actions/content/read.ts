"use server"

import prisma from "@/lib/db"
import { getUser } from "../getUser"

export async function getContents() {
      const user = await getUser()
      return prisma.contentSchema.findMany({
            where:{userId: user.id},
            include: {tags:true}
      })
}