import { z } from "zod"

export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address."
  ),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})
