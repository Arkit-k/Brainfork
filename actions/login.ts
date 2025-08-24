"use server";

import { signIn } from "@/auth"; // or wherever your auth config is
import { LoginSchema } from "@/schema/index"; // adjust path as needed
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const login = async (values: any) => {
  console.log(values);
  
  // Validate the input
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  
  const { email, password } = validatedFields.data;
  
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", // or wherever you want to redirect after login
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    
    throw error; // NextAuth redirects throw errors, so we need to re-throw
  }
  
  // This won't be reached due to redirect, but keeping for type safety
  return { success: "Login successful!" };
};