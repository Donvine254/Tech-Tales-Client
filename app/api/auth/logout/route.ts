import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { baseUrl } from "@/lib/utils";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  // Redirect to homepage
  return NextResponse.redirect(new URL("/", baseUrl));
}
