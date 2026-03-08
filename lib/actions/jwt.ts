"use server";
import * as jose from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

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
