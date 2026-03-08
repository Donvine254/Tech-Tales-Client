// app/api/auth/magic-link/route.ts
import prisma from "@/prisma/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/actions/session-utils";
import { setLastLoginMethod } from "@/lib/actions/login-method";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  // Step 1: Validate token presence
  if (!token) {
    return NextResponse.redirect(
      new URL("/checkpoint/login?error=error-token", request.url),
    );
  }

  try {
    // Step 2: Look up the token
    const verification = await prisma.verification.findUnique({
      where: { token },
    });

    if (!verification) {
      return NextResponse.redirect(
        new URL("/checkpoint/magic-link?error=error-token", request.url),
      );
    }
    // Step 3: Check expiry — delete and redirect if expired
    if (verification.expiresAt < new Date()) {
      await prisma.verification.delete({ where: { id: verification.id } });
      return NextResponse.redirect(
        new URL("/checkpoint/magic-link?error=error-expired", request.url),
      );
    }
    // Step 4: Validate token type and shape
    const value = verification.value as { userId: string };
    if (!value?.userId || verification.type !== "MAGIC_LINK") {
      return NextResponse.redirect(
        new URL("/checkpoint/magic-link?error=error-token", request.url),
      );
    }
    // Step 5: Fetch the user
    const user = await prisma.user.findUnique({
      where: { id: Number(value.userId) },
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        role: true,
        status: true,
        deactivated: true,
      },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/checkpoint/magic-link?error=error-token", request.url),
      );
    }
    // Step 6: Guard against suspended/deactivated accounts
    if (user.status === "SUSPENDED") {
      return NextResponse.redirect(
        new URL("/checkpoint/magic-link?error=error-suspended", request.url),
      );
    }
    if (user.deactivated) {
      return NextResponse.redirect(
        new URL("/checkpoint/magic-link?error=error-deactivated", request.url),
      );
    }
    // Step 7: Consume the token — delete it so it can't be reused
    await prisma.verification.delete({ where: { id: verification.id } });
    // Step 8: Create session (JWT + cookie + DB — same as normal login)
    await createSession({
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      picture: user.picture,
    });
    // Step 9: Redirect to home (or a post-login destination)
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Magic link login error:", error);
    return NextResponse.redirect(
      new URL("/checkpoint/magic-link?error=error-server", request.url),
    );
  } finally {
    await setLastLoginMethod("email");
  }
}
