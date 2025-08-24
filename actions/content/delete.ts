"use server"
import  prisma  from "@/lib/db"
import { revalidatePath } from 'next/cache';


export async function deleteContent(id: number) {
  try {
    await prisma.contentSchema.delete({
      where: { contentId: id },
    })
    revalidatePath("/dashboard") 
    return { success: true }
  } catch (error) {
    console.error("Delete failed:", error)
    return { success: false, error: "Failed to delete content" }
  }
}
