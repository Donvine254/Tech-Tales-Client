"use server";
import * as jose from "jose";
import prisma from "@/prisma/prisma";
import { cookies } from "next/headers";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function authenticateSSOLogin(email: string) {
  const cookieStore = await cookies();
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      //   add provider here to check whether this is valid SSO login
    });
    if (!user) {
      return { success: false, error: "User not found" };
    }
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
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
}
