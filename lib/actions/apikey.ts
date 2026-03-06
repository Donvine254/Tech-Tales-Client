"use server";
import { isVerifiedUser } from "@/dal/auth-check";
import prisma from "@/prisma/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

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

// function to list user api keys

export async function getApiKeys() {
  const user = await isVerifiedUser();
  if (!user) return null;

  try {
    const data = await prisma.apiKey.findMany({
      where: {
        userId: Number(user.userId),
      },
      select: {
        id: true,
        name: true,
        start: true,
        expiresAt: true,
        createdAt: true,
      },
    });
    return data;
  } catch (error) {
    console.error("[error getting API keys", error);
    return null;
  }
}

export async function deleteApiKey(id: string) {
  const user = await isVerifiedUser();
  if (!user) return null;

  try {
    await prisma.apiKey.delete({
      where: {
        id,
        userId: Number(user.userId),
      },
    });
    revalidatePath("/me/settings");
    return { success: true, message: "Key deleted successfully" };
  } catch (error) {
    return { success: false };
  }
}

// function to validate api key

export async function validateApiKey(req: Request) {
  // 1. Extract API key
  const authHeader = req.headers.get("authorization");
  let apiKey: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    apiKey = authHeader.replace("Bearer ", "").trim();
  } else {
    const { searchParams } = new URL(req.url);
    apiKey = searchParams.get("apiKey");
  }

  if (!apiKey) {
    return { success: false, error: "Missing API key" };
  }

  // 2. Hash the incoming key and look it up
  const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");

  try {
    const record = await prisma.apiKey.findUnique({
      where: { key: hashedKey },
      select: {
        id: true,
        userId: true,
        name: true,
        enabled: true,
        expiresAt: true,
        requestCount: true,
        remaining: true,
        permissions: true,
        prefix: true,
        start: true,
        createdAt: true,
      },
    });

    if (!record) {
      return { success: false, error: "Invalid API key" };
    }

    if (!record.enabled) {
      return { success: false, error: "API key is disabled" };
    }

    if (record.expiresAt && record.expiresAt < new Date()) {
      return { success: false, error: "API key has expired" };
    }

    // 3. Update usage tracking
    await prisma.apiKey.update({
      where: { id: record.id },
      data: {
        requestCount: { increment: 1 },
        lastRequest: new Date(),
      },
    });

    return {
      success: true,
      data: {
        userId: record.userId,
        keyData: record,
      },
    };
  } catch (err) {
    return { success: false, error: "Error verifying API key", details: err };
  }
}
