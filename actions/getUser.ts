"use server"


import  prisma  from "@/lib/db"
import   { auth  } from  "@/auth"

export async function getUser() {
      const session = await auth()
      if (!session?.user?.email) throw new Error("Not authenticated")

    const user = await prisma.user.findUnique({
      where: {email: session.user.email}
    })            

    if (!user) throw new Error("user not found")
      return user
}