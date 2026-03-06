"use server";
import prisma from "@/prisma/prisma";
import { getClientIP } from "../helpers/user-ip";
import { rateLimitByIp } from "./rate-limiter";
import * as bcrypt from "bcrypt";
import { hashPassword } from "./auth";

export async function handleForgetPassword(
  token: string,
  password: string,
): Promise<{
  success: boolean;
  message: string;
  error?: "error-token" | "error-rate-limit" | "error-server";
}> {
  if (!token) {
    return { success: false, error: "error-token", message: "Token not found" };
  }

  try {
    // step 1: check the attempts
    const ip = await getClientIP();
    const rateCheck = rateLimitByIp(ip);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: "error-rate-limit",
        message: "Too many requests, try again after 5 minutes",
      };
    }
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

    if (verification.type !== "PASSWORD_RESET") {
      return {
        success: false,
        error: "error-token",
        message: "Token validation failed",
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
    const value = verification.value as { userId: number };
    if (!value?.userId) {
      return {
        success: false,
        error: "error-token",
        message: "Token payload is invalid",
      };
    }

    const userId = Number(value.userId);

    // Fetch existing user to compare passwords
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { password_digest: true },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "error-server",
        message: "User not found",
      };
    }

    const isSamePassword = await bcrypt.compare(
      password,
      existingUser.password_digest,
    );
    if (isSamePassword) {
      return {
        success: false,
        error: "error-server",
        message: "New password cannot be the same as your old password.",
      };
    }

    const password_digest = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password_digest },
    });
    await prisma.verification.delete({ where: { id: verification.id } });
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error("Reset password error:", error);
    const e = error as Error;
    return {
      success: false,
      error: "error-server",
      message: e.message || "Something unexpected happened",
    };
  }
}
