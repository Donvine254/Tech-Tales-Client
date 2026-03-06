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
    return { success: true, deleted: result.count };
  } catch (error) {
    console.error("[logoutAllSessions]", error);
    return { success: false, message: `Error deleting sessions: ${error}` };
  }
}
// ── Logout all OTHER devices, keep current alive ───────────────────────────

export async function logoutOtherSessions(userId: number) {
  const token = await getCurrentToken();
  if (!token) return;
  try {
    await prisma.session.deleteMany({
      where: { userId, NOT: { token } },
    });
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("[logoutSessionById]", error);
    return { success: false, message: `Error deleting sessions: ${error}` };
  }
}

// ── Logout a specific session by ID (from "Manage Devices" UI) ────────────

export async function logoutSessionById(sessionId: string, userId: number) {
  try {
    await prisma.session.delete({
      where: { id: sessionId, userId },
    });
    return { success: true, message: "Session deleted successfully" };
  } catch (error) {
    console.error("[logoutSessionById]", error);
    return { success: false, message: `Error deleting session: ${error}` };
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

export async function invalidateSession(token: string): Promise<void> {
  // deletes session when token is expired
  if (!token) return;
  try {
    await prisma.session.delete({ where: { token } }).catch((err) => {
      if (err?.code !== "P2025") {
        console.error("[session:invalidate] Unexpected error:", err);
      }
    });
  } catch (error) {
    console.error("[session:invalidate] Error deleting session:", error);
  }
}
