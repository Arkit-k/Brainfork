// auth.config.ts
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema/index"
import bcrypt from "bcryptjs"

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          
          // Move database logic to a separate function
          const user = await getUserByEmail(email)
          
          if (!user || !user.password) return null
          
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig

// Separate function for database operations
async function getUserByEmail(email: string) {
  try {
    // Import prisma dynamically to avoid edge runtime issues
    const { default: prisma } = await import("@/lib/db")
    return await prisma.user.findUnique({ where: { email } })
  } catch {
    return null
  }
}