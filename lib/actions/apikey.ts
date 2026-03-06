"use server";
import { isVerifiedUser } from "@/dal/auth-check";
import prisma from "@/prisma/prisma";
import crypto from "crypto";

type GenerateApiKeyParams = {
  body: {
    name: string;
    expiresIn: Date | null;
    prefix: string;
  };
};
export async function generateApiKey({ body }: GenerateApiKeyParams) {
  const { name, expiresIn, prefix } = body;
  const session = await isVerifiedUser();
  if (!session) {
    return null;
  }
  const rawKey = crypto.randomBytes(32).toString("hex");
  const fullKey = `${prefix}${rawKey}`;
  const start = fullKey.slice(0, 12); // e.g. "Tctls-ab12cd"

  const hashedKey = crypto.createHash("sha256").update(fullKey).digest("hex");
  try {
    const data = await prisma.apiKey.create({
      data: {
        name,
        userId: session.userId,
        key: hashedKey,
        start,
        prefix,
        expiresAt: expiresIn ?? null,
      },
    });
    return {
      ...data,
      key: fullKey,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
