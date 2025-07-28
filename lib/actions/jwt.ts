"use server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { User } from "@prisma/client";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

type AuthUser = Pick<User, "id" | "email" | "username" | "picture" | "role">;
export async function createAndSetAuthTokenCookie(user: AuthUser) {
  const cookieStore = await cookies();
  const token = await new jose.SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
    picture: user.picture,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return token;
}

// function to create and set email verification cookie
// this is used to verify the email after registration
export async function createAndSetEmailVerificationCookie(payload: {
  id: number;
  email: string;
}) {
  const cookieStore = await cookies();
  const token = await new jose.SignJWT({
    userId: payload.id,
    email: payload.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

  cookieStore.set("verify_email_token", token, {
    httpOnly: true,
    maxAge: 30 * 60,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
}

/**
 * Create a password reset token for a given user.
 */
export async function createPasswordResetToken(
  user: Pick<User, "id" | "email" | "username">
) {
  const token = await new jose.SignJWT({
    id: user.id,
    email: user.email,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h") // token expires in 30 minutes
    .sign(JWT_SECRET);

  return token;
}

/*
Validate tokens with jwt
*/
export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return {
      valid: true,
      payload,
    };
  } catch (error) {
    console.error("Invalid or expired token", error);
    return {
      valid: false,
      payload: null,
    };
  }
}
