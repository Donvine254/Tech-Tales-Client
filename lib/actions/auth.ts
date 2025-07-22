"use server";
import prisma from "@/prisma/prisma";
import * as bcrypt from "bcrypt";
import { createAndSetAuthTokenCookie } from "./jwt";
import { rateLimitByIp } from "./rate-limiter";
import { Prisma } from "@prisma/client/edge";
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
// Login function for normal users
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
        redirect: "/checkpoint/unverified",
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
// register function for normal users & SSO users
type RegisterData = {
  email: string;
  username: string;
  password: string;
  picture: string;
  handle: string;
  bio?: string;
  provider?: "email" | "google" | "github";
};
type RequireFields<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

type RegisterPayload = RequireFields<
  RegisterData,
  "email" | "username" | "password" | "handle"
>;
export async function registerUser(data: RegisterPayload) {
  const { email, username, password, picture, handle, bio, provider } = data;
  try {
    //step-1: hash the password
    const password_digest = await hashPassword(password);
    //step-2: create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password_digest,
        picture:
          picture ||
          `https://ui-avatars.com/api/?background=random&name=${username}`,
        handle,
        bio: bio || "This user has no bio",
        provider: provider || "email",
        email_verified: provider && provider !== "email",
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    console.log("User created:", user);
    // send welcome email if provider is email
    return { success: true, message: "Welcome onboard  🎉" };
  } catch (error) {
    console.error("Error in registerUser:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const meta = error.meta as { target?: string[] };
        const target = (meta?.target?.[0] ?? "email") as
          | "email"
          | "username"
          | "handle";
        return {
          success: false,
          message: `${target.toLocaleUpperCase()} is already taken`,
          field: target,
        };
      }
    }
    return {
      success: false,
      message: (error as Error).message || "An error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
}

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
