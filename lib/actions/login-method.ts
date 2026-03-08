// lib/auth/login-method.ts
import { cookies } from "next/headers";

export type LoginMethod = "email" | "magic_link" | "google" | "github";

const COOKIE_NAME = "last_login_method";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function setLastLoginMethod(method: LoginMethod) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, method, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false, // needs to be readable client-side for the banner
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getLastLoginMethod(): Promise<LoginMethod | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return (cookie?.value as LoginMethod) ?? null;
}
