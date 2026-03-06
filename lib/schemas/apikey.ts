import z from "zod";

export const apiKeyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name cannot be empty")
    .max(64, "Pick a shorter name"),
  expiresAt: z.string().trim().optional(),
});
export type ApiKeyForm = z.infer<typeof apiKeyFormSchema>;
