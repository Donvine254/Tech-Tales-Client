"use server";
import { cookies, headers } from "next/headers";
import * as jose from "jose";
import prisma from "@/prisma/prisma";
import { getCachedSession } from "./session-cache";
import { AuthUser } from "@/types";
import { getClientIP } from "../helpers/user-ip";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getRequestMeta() {
  const headerStore = await headers();
  const ip = await getClientIP();
  const userAgent = headerStore.get("user-agent") ?? "unknown";
  return { ip, userAgent };
}

async function generateToken(user: AuthUser): Promise<string> {
  return new jose.SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
    picture: user.picture,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
}

// ─── Create Session ───────────────────────────────────────────────────────────

/**
 * Reusable by credentials login, SSO, or any future auth method.
 * Generates JWT, sets cookie, persists session to DB (non-blocking).
 */
export async function createSession(user: AuthUser): Promise<void> {
  const [token, { ip, userAgent }] = await Promise.all([
    generateToken(user),
    getRequestMeta(),
  ]);

  // Must complete before returning — user needs the cookie set
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: SESSION_DURATION_MS / 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  // Non-blocking — never delays the login response
  prisma.session
    .create({
      data: {
        token,
        userId: user.id,
        ipAddress: ip,
        userAgent,
        expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    .catch((err) => {
      console.error("[session:create] Failed to persist session:", err);
    });
}

// ─── Get Session ──────────────────────────────────────────────────────────────

/**
 * Verifies JWT then confirms session exists in DB (cached 60s).
 * Returns fresh user data from DB — not stale JWT claims.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    // Step 1: verify JWT — cheap crypto, no DB
    await jose.jwtVerify(token, JWT_SECRET);

    // Step 2: confirm session exists and pull fresh user data
    const session = await getCachedSession(token);

    if (!session || session.expiresAt < new Date()) {
      cookieStore.delete("token");
      return null;
    }

    const { user } = session;

    // Guard: suspended or deactivated users get bounced even with valid session
    if (user.status === "SUSPENDED" || user.deactivated) {
      cookieStore.delete("token");
      return null;
    }

    return {
      sessionId: session.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      picture: user.picture,
    };
  } catch (error) {
    const e = error as Error;
    console.error("[session:get] Invalid token:", e.message);
    cookieStore.delete("token");
    return null;
  }
}

// ─── Delete Session ───────────────────────────────────────────────────────────

/**
 * Clears cookie and removes session from DB.
 * P2025 (record not found) is silently ignored — safe for concurrent logouts.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  cookieStore.delete("token"); // always clear cookie first

  if (!token) return;

  await prisma.session.delete({ where: { token } }).catch((err) => {
    if (err?.code !== "P2025") {
      console.error("[session:delete] Unexpected error:", err);
    }
  });
}
