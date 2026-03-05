"use server";
import crypto from "crypto";
import prisma from "@/prisma/prisma";
import type { VerificationType } from "@/src/generated/prisma/enums";
import { Prisma } from "@/src/generated/prisma/client";
import { sendVerificationEmail, sendWelcomeEmail } from "@/emails/mailer";
import { baseUrl } from "../utils";
import { getClientIP } from "../helpers/user-ip";
import { rateLimitByIp } from "./rate-limiter";

interface CreateVerificationParams {
  identifier: string;
  type: VerificationType;
  value?: Prisma.InputJsonValue;
  expiresInMinutes?: number;
}

export async function createVerificationToken({
  identifier,
  type,
  value,
  expiresInMinutes = 15,
}: CreateVerificationParams) {
  const token = crypto.randomBytes(32).toString("base64url");

  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  await prisma.verification.create({
    data: {
      identifier,
      token,
      type,
      value,
      expiresAt,
    },
  });

  return token;
}

export async function VerifyEmail(token: string): Promise<{
  success: boolean;
  error?: "error-token" | "error-server";
  message: string;
}> {
  if (!token) {
    return { success: false, error: "error-token", message: "Token not found" };
  }

  try {
    const verification = await prisma.verification.findUnique({
      where: { token },
    });
    if (!verification) {
      return {
        success: false,
        error: "error-token",
        message: "Token is invalid or does not exist",
      };
    }
    if (verification.expiresAt < new Date()) {
      await prisma.verification.delete({ where: { id: verification.id } });

      return {
        success: false,
        error: "error-token",
        message: "Token has expired",
      };
    }

    const value = verification.value as {
      userId: string;
    };
    if (!value || verification.type !== "EMAIL_VERIFICATION") {
      return {
        success: false,
        error: "error-token",
        message: "Token validation failed",
      };
    }
    const user = await prisma.user.update({
      where: {
        id: Number(value.userId),
      },
      data: {
        email_verified: true,
      },
      select: {
        email: true,
        username: true,
      },
    });

    await prisma.verification.delete({
      where: { id: verification.id },
    });

    setImmediate(async () => {
      await sendWelcomeEmail(user.email, user.username);
    });

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        error: "error-server",
        message: "Account does not exist",
      };
    }
    const e = error as Error;
    return {
      success: false,
      error: "error-server",
      message: e.message || "Something unexpected happened",
    };
  }
}
/*Function to resend verification email for email verification */
export async function resendVerification(email: string) {
  // step 1: Block too many attempts
  const ip = await getClientIP();
  const rateCheck = rateLimitByIp(ip);
  if (!rateCheck.allowed) {
    return { success: false, message: rateCheck.message };
  }
  //   Find user by email
  const user = await prisma.user.findFirst({
    where: { email, email_verified: false, auth_provider: "email" },
  });

  // If no user, we return early.
  // Tip: Still return a generic "Success" to prevent email enumeration attacks!
  if (!user)
    return {
      success: true,
      message: "Verification email sent if account exists.",
    };
  // 1. Generate the new token immediately so we have the value
  const newToken = await createVerificationToken({
    identifier: email,
    type: "EMAIL_VERIFICATION",
    value: { userId: user.id },
    expiresInMinutes: 1440, // 24 hours
  });

  // 2. Offload the "heavy" work to the background
  setImmediate(async () => {
    try {
      // Cleanup older email tokens
      await prisma.verification.deleteMany({
        where: {
          identifier: email,
          type: "EMAIL_VERIFICATION",
          token: { not: newToken },
        },
      });

      // Send the actual email
      await sendVerificationEmail(
        email,
        `${baseUrl}/checkpoint/verify?token=${newToken}`,
      );
    } catch (error) {
      console.error("Background verification task failed:", error);
      // Logic for logging or retrying could go here
    }
  });

  // 3. Return to the user instantly
  return { success: true, message: "Verification email sent." };
}
