

import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});
export const RegisterSchema = z.object({
  name: z.string().min(2),    
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const ContentSchemas = z.object({
  title:z.string().min(2),
  link : z.string(),
  discription: z.string(),
  tags: z.array(z.string()),
  type: z.enum(["NOTION", "TWITTER", "YOUTUBE", "NOTES"]),
})