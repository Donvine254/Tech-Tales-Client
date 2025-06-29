"use server";
import prisma from "@/prisma/prisma";
import { createAndSetAuthTokenCookie } from "./jwt";
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
