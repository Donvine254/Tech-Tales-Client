import prisma from "@/prisma/prisma";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  cookieStore.delete("token");

  if (token) {
    await prisma.session.delete({ where: { token } }).catch((err) => {
      if (err?.code !== "P2025") {
        console.error("[session:delete] Unexpected error:", err);
      }
    });
  }

  const response = NextResponse.redirect(new URL("/login", req.url));
  return response;
}
