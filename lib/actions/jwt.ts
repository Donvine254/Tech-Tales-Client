"use server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { User } from "@prisma/client";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createAndSetAuthTokenCookie(user: User) {
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
  });
  return token;
}
