"use server";
import prisma from "@/prisma/prisma";
import * as bcrypt from "bcrypt";
import { createAndSetAuthTokenCookie } from "./jwt";
import { rateLimitByIp } from "./rate-limiter";
export async function authenticateSSOLogin(email: string) {
  try {
    // we can use omit to omit sensitive fields
    //e.g const user = await prisma.user.findUnique({ omit: { password: true }where: { id: 1}})

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
      },
      //   add provider here to check whether this is valid SSO login
    });
    if (!user) {
      return { success: false, error: "User not found" };
    }
    await createAndSetAuthTokenCookie(user);
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, error: e.message || "Something went wrong" };
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
      return { success: false, message: rateCheck.message, field: "password" };
    }
    //step-2: check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
        email_verified: true,
        password_digest: true,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "No matching user found!",
        field: "email",
      };
    }
    if (!user.email_verified) {
      return {
        success: false,
        message: "Email not verified. Verify your account to login",
        field: "email",
      };
    }
    //step-3: validate passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_digest
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Wrong password, try again",
        field: "password",
      };
    }
    //step-4: auth success: create cookie
    await createAndSetAuthTokenCookie(user);
    return { success: true, message: "Logged in successfully 🎉" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Unexpected error occured!",
    };
  }
}

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
// function to change user password
export async function changeUserPassword(
  userId: number,
  data: { current: string; newPwd: string },
  ip: string
) {
  const { current, newPwd } = data;
  const hashedPassword = await hashPassword(newPwd);

  try {
    // step 1: check the attempts
    const rateCheck = rateLimitByIp(ip);
    if (!rateCheck.allowed) {
      return {
        success: false,
        message: "Too many requests, try again after 5 minutes",
      };
    }
    // step 2: find the user and get the existing password
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        password_digest: true,
      },
    });

    if (!user) {
      return { success: false, message: "Record to update not found!" };
    }
    //step 3: compare existing password with the current password input
    const isValidPassword = await bcrypt.compare(current, user.password_digest);
    if (!isValidPassword) {
      // Log failed attempt
      return { success: false, message: "Wrong password, try again" };
    }
    // step 4: change the password and return
    await prisma.user.update({
      where: { id: user.id },
      data: { password_digest: hashedPassword },
    });

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "An error occurred" };
  }
}
