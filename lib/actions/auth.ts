"use server";
import prisma from "@/prisma/prisma";
import * as bcrypt from "bcrypt";
import {
  createAndSetAuthTokenCookie,
  createAndSetEmailVerificationCookie,
  createAccountActionsToken,
  verifyToken,
} from "./jwt";
import { rateLimitByIp } from "./rate-limiter";
import { Prisma } from "@prisma/client/edge";
import { baseUrl, convertToHandle, generatePassword } from "../utils";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "@/emails/mailer";

/* Function to hash passwords */
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
/* function to authenticate SSO login
This function is used for both Google and GitHub SSO logins
*/
export async function authenticateSSOLogin(
  userInfo: {
    email: string;
    username: string;
    picture?: string;
  },
  provider: "google" | "github"
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
        deactivated: true,
        status: true,
      },
    });
    if (!user) {
      const password_digest = await hashPassword(generatePassword());
      // if user not found, create a new user
      const newUser = await prisma.user.create({
        data: {
          email: userInfo.email.toLowerCase(),
          username: userInfo.username.toLowerCase(),
          password_digest,
          picture:
            userInfo.picture ||
            `https://ui-avatars.com/api/?background=random&name=${userInfo.username}`,
          handle: convertToHandle(userInfo.username),
          auth_provider: provider,
          email_verified: true,
        },
        select: {
          id: true,
          email: true,
          username: true,
          picture: true,
          role: true,
        },
      });
      if (!newUser) {
        return {
          success: false,
          error: "SSO registration failed, please try again",
        };
      }
      await createAndSetAuthTokenCookie(newUser);
      return {
        success: true,
        message: "Registered and logged in successfully 🎉",
      };
    }
    if (user.status === "SUSPENDED") {
      return {
        successs: false,
        message: "Your account has been suspended, contact support.",
        field: "email",
      };
    }
    if (user.deactivated) {
      return {
        successs: false,
        message:
          "Your account has been deactivated, check your email to restore your account",
        field: "email",
      };
    }
    await createAndSetAuthTokenCookie(user);
    return { success: true, message: "Logged in successfully 🎉" };
  } catch (error) {
    const e = error as Error;
    return { success: false, error: e.message || "Something went wrong" };
  }
}
/*Login function for normal users */
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
        deactivated: true,
        status: true,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "No matching user found!",
        field: "email",
      };
    }
    if (user.status === "SUSPENDED") {
      return {
        successs: false,
        message: "Your account has been suspended, contact support.",
        field: "email",
      };
    }
    if (user.deactivated) {
      return {
        successs: false,
        message:
          "Your account has been deleted, check your email to restore your account",
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
    //step-5: update user status as active
    return { success: true, message: "Logged in successfully 🎉" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Unexpected error occured!",
    };
  }
}

/* register function for normal users & SSO users */
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
        auth_provider: provider || "email",
        email_verified: provider && provider !== "email",
      },
      select: {
        id: true,
        email: true,
        email_verified: true,
        auth_provider: true,
      },
    });
    if (!user.email_verified && user.auth_provider === "email") {
      const token = await createAndSetEmailVerificationCookie({
        id: user.id,
        email: user.email,
      });
      // send welcome email if provider is email
      setImmediate(() => {
        sendVerificationEmail(
          user.email,
          `${baseUrl}/checkpoint/verify?token=${token}`
        ).catch(console.error);
      });
    } else if (user.auth_provider !== "email") {
      setImmediate(() => {
        sendWelcomeEmail(user.email, username).catch(console.error);
      });
    }
    return { success: true, message: "Welcome onboard 🎉" };
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
/*Function to reset verify user email after registration and send welcome email */
export async function VerifyEmail(token: string): Promise<{
  success: boolean;
  error?: "error-token" | "error-server";
  message: string;
}> {
  if (!token) {
    return { success: false, error: "error-token", message: "Token not found" };
  }
  const res = await verifyToken(token);
  console.log(res);
  if (!res.valid || !res.payload) {
    return {
      success: false,
      error: "error-token",
      message: "Token is invalid or has expired",
    };
  }
  const userId = res.payload.userId;
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        email_verified: true,
      },
    });

    setImmediate(async () => {
      // send welcome email
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
  } finally {
    await prisma.$disconnect();
  }
}

/*Function to resend email verification email to the user. Used in checkpoint/unverified/page.tsx */
export async function resendVerificationEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        email_verified: true,
      },
    });
    // check if user exists
    if (!user) {
      return {
        success: false,
        message: "Account not found, kindly input a correct email address",
      };
    }
    // check if user is already verified
    if (user.email_verified) {
      return {
        success: true,
        message: "Email already verified, proceed to login",
      };
    }
    const token = await createAndSetEmailVerificationCookie({
      id: user.id,
      email: user.email,
    });
    await sendVerificationEmail(
      user.email,
      `${baseUrl}/checkpoint/verify?token=${token}`
    );
    return {
      sucess: true,
      message: "Email sent successfully, Kindly check your email",
    };
  } catch (error) {
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
  } finally {
    await prisma.$disconnect();
  }
}
/* function to change user password */
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
/*
Function to send email for resetting the password, valid for 24hrs
*/
export async function handlePasswordResetRequest(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        username: true,
        email: true,
        id: true,
        deactivated: true,
        email_verified: true,
      },
    });

    if (!user) {
      return { success: false, message: "No matching user found" };
    }
    if (user.deactivated || !user.email_verified) {
      if (user.deactivated) {
        return {
          success: false,
          message:
            "Your account has been marked for deletion. Please restore your account before resetting your password.",
        };
      }

      if (!user.email_verified) {
        return {
          success: false,
          message:
            "Your email address has not been verified. Please verify your email before requesting a password reset.",
        };
      }
    }
    const token = await createAccountActionsToken(user, "8h");
    const link = `${baseUrl}/password/new?token=${token}`;
    const res = await sendPasswordResetEmail(user.username, user.email, link);
    if (res.success) {
      return {
        success: true,
        message: "Check your email to reset your password",
      };
    } else {
      return {
        success: false,
        message: "Email delivery failed. Try again",
      };
    }
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      message: "Failed to process password reset request",
    };
  } finally {
    await prisma.$disconnect();
  }
}
/*
Function to reset user password in the account page (me)/settings/security.tsx
*/
export async function resetPassword(userId: number, password: string) {
  const password_digest = await hashPassword(password);
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        password_digest,
      },
    });
    if (!user) {
      return { success: false, message: "User not found!" };
    }
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Something went wrong." };
  }
}

/*function to restore user account */
export async function restoreAccount(token: string): Promise<{
  success: boolean;
  error?: "error-token" | "error-server";
  message: string;
}> {
  if (!token) {
    return { success: false, error: "error-token", message: "Token not found" };
  }
  const res = await verifyToken(token);
  if (!res.valid || !res.payload) {
    return {
      success: false,
      error: "error-token",
      message: "Token is invalid or has expired",
    };
  }
  const userId = res.payload.id;
  try {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        deactivated: false,
        deactivatedAt: null,
        status: "INACTIVE",
      },
    });

    setImmediate(async () => {
      // Unarchive blog posts
      await prisma.blog.updateMany({
        where: { authorId: Number(userId), status: "ARCHIVED" },
        data: { status: "PUBLISHED" },
      });
      // Unarchive comments
      await prisma.comment.updateMany({
        where: { authorId: Number(userId) },
        data: { show: true },
      });
    });
    // set immediate and restore comments and blogs
    return { success: true, message: "Account restored successfully" };
  } catch (error) {
    // TODO:handle record to update not found
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
  } finally {
    await prisma.$disconnect();
  }
}
