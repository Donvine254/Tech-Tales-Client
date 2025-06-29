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
