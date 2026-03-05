// actions/auth/manage-sessions.ts
"use server";
import { cookies } from "next/headers";
import { deleteSession } from "./session-utils";
import prisma from "@/prisma/prisma";

async function getCurrentToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

// ── Logout current device ──────────────────────────────────────────────────

export async function logout() {
  await deleteSession();
}

// ── Logout all sessions including current ─────────────────────────────────

export async function logoutAllSessions(userId: number) {
  try {
    const result = await prisma.session.deleteMany({ where: { userId } });

    if (result.count === 0) {
      throw new Error(
        `No sessions deleted for userId: ${userId} — check type or existing records`,
      );
    }
    return { success: true, deleted: result.count };
  } catch (error) {
    console.error("[logoutAllSessions]", error);
    throw error;
  }
}
// ── Logout all OTHER devices, keep current alive ───────────────────────────

export async function logoutOtherSessions(userId: number) {
  const token = await getCurrentToken();
  if (!token) return;

  await prisma.session.deleteMany({
    where: { userId, NOT: { token } },
  });
}

// ── Logout a specific session by ID (from "Manage Devices" UI) ────────────

export async function logoutSessionById(sessionId: string, userId: number) {
  try {
    const result = await prisma.session.deleteMany({
      where: { id: sessionId, userId },
    });

    // Return count so the client knows if it actually deleted something
    if (result.count === 0) {
      throw new Error(
        `No session deleted — sessionId: ${sessionId}, userId: ${userId} — possible type mismatch or record not found`,
      );
    }

    return { success: true, deleted: result.count };
  } catch (error) {
    console.error("[logoutSessionById]", error);
    throw error; // re-throw so the client catches it
  }
}

// ── Get all active sessions (for "Manage Devices" UI) ─────────────────────

export async function getActiveSessions(userId: number) {
  const token = await getCurrentToken();

  const sessions = await prisma.session.findMany({
    where: { userId, expiresAt: { gt: new Date() } },
    select: {
      id: true,
      ipAddress: true,
      userAgent: true,
      createdAt: true,
      expiresAt: true,
      token: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return sessions.map(({ token: sessionToken, ...s }) => ({
    ...s,
    isCurrentDevice: sessionToken === token,
  }));
}
