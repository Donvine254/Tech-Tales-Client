import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  // Redirect to homepage
  return NextResponse.redirect(new URL("/login", req.url));
}
