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
  await prisma.session.deleteMany({ where: { userId } });
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

// ── Logout all OTHER devices, keep current alive ───────────────────────────

export async function logoutOtherSessions(userId: number) {
  const token = await getCurrentToken();
  if (!token) return;

  const res = await prisma.session.deleteMany({
    where: { userId, NOT: { token } },
  });
  console.log(res);
}

// ── Logout a specific session by ID (from "Manage Devices" UI) ────────────

export async function logoutSessionById(sessionId: string, userId: number) {
  // userId scope prevents a user from deleting another user's session
  await prisma.session.deleteMany({
    where: { id: sessionId, userId },
  });
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
