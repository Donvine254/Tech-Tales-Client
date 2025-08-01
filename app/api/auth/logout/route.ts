import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/actions/session";
import { updateUserActivityStatus } from "@/lib/actions/analytics";

export async function GET(req: NextRequest) {
  //begin by updating user session
  const session = await getSession();
  // Fire-and-forget: update user status
  if (session?.userId) {
    setImmediate(() => {
      updateUserActivityStatus(Number(session.userId), "INACTIVE");
    });
  }
  // Redirect to homepage
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete("token");
  return response;
}
