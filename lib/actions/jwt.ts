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
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return token;
}
