// lib/auth.ts
import { cookies } from "next/headers"; 

export async function signOut() {
  const cookieStore = await cookies(); // 👈 await here
  cookieStore.delete("next-auth.session-token"); 
}
