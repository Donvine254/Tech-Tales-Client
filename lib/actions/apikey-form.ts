"use server";
import { isVerifiedUser } from "@/dal/auth-check";
import { apiKeyFormSchema, type ApiKeyForm } from "@/lib/schemas/apikey";
import { revalidatePath } from "next/cache";
import { generateApiKey } from "./apikey";

export type FormState = {
  errors?: {
    name?: string[];
    expiresAt?: string[];
  };
  success?: boolean;
  message?: string;
  key?: string;
  data?: ApiKeyForm;
};

export async function createApiKey(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawData = {
    name: formData.get("name") as string,
    expiresAt: formData.get("expiresAt") as string | undefined,
  };

  // ✅ validate with Zod
  const validatedFields = apiKeyFormSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: rawData,
    };
  }
  const expiresIn =
    validatedFields.data.expiresAt && validatedFields.data.expiresAt !== "never"
      ? Number.parseInt(validatedFields.data.expiresAt) * 60 * 60 * 24
      : process.env.NODE_ENV === "production"
        ? 365 * 60 * 60 * 24
        : null;
  try {
    const data = await generateApiKey({
      body: {
        name: validatedFields.data.name,
        expiresIn: expiresIn ? new Date(Date.now() + expiresIn * 1000) : null,
        prefix: "Tctls-",
      },
    });
    if (!data) {
      return {
        success: false,
        message: "Failed to create API Key",
      };
    }
    revalidatePath("/me/settings");
    return {
      success: true,
      message: "API key created successfully!.",
      key: data.key,
    };
  } catch (error) {
    const e = error as Error;

    return {
      message: e.message || "Something went wrong. Please try again.",
      data: rawData,
    };
  }
}
