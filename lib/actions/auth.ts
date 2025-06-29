"use server";
import prisma from "@/prisma/prisma";
import * as bcrypt from "bcrypt";
import { createAndSetAuthTokenCookie } from "./jwt";
import { rateLimitByIp } from "./rate-limiter";
export async function authenticateSSOLogin(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      //   add provider here to check whether this is valid SSO login
    });
    if (!user) {
      return { success: false, error: "User not found" };
    }
    await createAndSetAuthTokenCookie(user);
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function authenticateUserLogin(
  email: string,
  password: string,
  ip: string
) {
  try {
    // step-1: check the login attempts
    const rateCheck = rateLimitByIp(ip);
    if (!rateCheck.allowed) {
      return { success: false, message: rateCheck.message };
    }
    //step-2: check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      return { success: false, message: "user not found" };
    }
    if (!user.email_verified) {
      return {
        success: false,
        message: "Email not verified. Verify your account to login",
      };
    }
    //step-3: validate passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_digest
    );
    if (!isPasswordValid) {
      return { success: false, message: "Wrong password, try again" };
      // call ip limiter and add one attempt
      //rateLimitByIp(ip)
    }
    //step-4: auth success: create cookie
    await createAndSetAuthTokenCookie(user);
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Unexpected error occured!",
    };
  }
}
