import { z } from "zod";
import { validateEmail } from "../utils";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .transform((val) => val.toLowerCase())
    .refine(validateEmail, {
      message: "Please enter a valid email address",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const simplePasswordRegex = /^(?=.*\d).{8,}$/;
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_ ]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .transform((val) => val.toLowerCase())
    .refine(validateEmail, {
      message: "Please enter a valid email address",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(simplePasswordRegex, "Password must contain at least one number"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
