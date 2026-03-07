"use server";
import prisma from "@/prisma/prisma";
import { createVerificationToken } from "./verification";
import { sendMagicLinkEmail } from "@/emails/mailer";
import { baseUrl } from "../utils";
import { getClientIP } from "../helpers/user-ip";
import { rateLimitByIp } from "./rate-limiter";

export async function sendMagicLink(email: string) {
  try {
    // step 1: check the attempts
    const ip = await getClientIP();
    const rateCheck = rateLimitByIp(ip);
    if (!rateCheck.allowed) {
      return {
        success: false,
        message: "Too many requests, try again after 5 minutes",
      };
    }
    // Step 2: Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return {
        success: true,
        message: "If an account exists, a magic link has been sent.",
      };
    }
    // Step 3: Create verification token of type MAGIC_LINK
    const token = await createVerificationToken({
      identifier: user.email,
      type: "MAGIC_LINK",
      expiresInMinutes: 15,
      value: {
        userId: user.id,
        expectedChallenge: crypto.randomUUID(),
      },
    });

    // Step 4: Send the magic link email
    setImmediate(() => {
      sendMagicLinkEmail(
        user.email,
        `${baseUrl}/api/auth/magic-link?token=${token}`,
      ).catch(console.error);
    });

    return {
      success: true,
      message: "Magic link sent! Check your inbox.",
    };
  } catch (error) {
    console.error("Error in sendMagicLink:", error);
    return {
      success: false,
      message: (error as Error).message || "An error occurred",
    };
  }
}
