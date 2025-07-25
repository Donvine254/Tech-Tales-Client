"use server";
import { cookies } from "next/headers";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    console.warn("No token found");
    return null;
  }
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload;
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("Invalid or expired token:", error.message);
    cookieStore.delete("token");
    // delete the token if it is invalid or has expired
    return null;
  }
};

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

// function to get the email verification cookie
export async function getEmailVerificationCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("verify_email_token")?.value;
  if (!token) {
    console.warn("No email verification token found");
    return null;
  }
  return token;
}

export async function getEmailVerificationCookieData() {
  const token = await getEmailVerificationCookie();
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as { userId: number; email: string };
  } catch (error) {
    const e = error as Error;
    console.error("Invalid or expired email verification token:", e.message);
    cookieStore.delete("verify_email_token");
    return null;
  }
}
