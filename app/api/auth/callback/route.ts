import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect("/login?error=missing_token");
  }

  try {
    // Verify the JWT token
    const user = jose.jwtVerify(token, JWT_SECRET);
    console.log(user);
    // Optionally, set a cookie or session here
    const response = NextResponse.redirect("/dashboard");
    response.cookies.set("auth_token", token, { httpOnly: true, path: "/" });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect("/login?error=invalid_token");
  }
}
