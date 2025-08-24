"use server";

import { signOut } from "@/auth"; // adjust path to your auth config

export const logout = async () => {
  await signOut({
    redirectTo: "/auth/login" // or wherever you want to redirect after logout
  });
};