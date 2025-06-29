import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath =
    path.startsWith("/me") ||
    path.startsWith("/my-blogs") ||
    path.startsWith("/create") ||
    path.startsWith("/admin") ||
    path.startsWith("/api");

  const isPublicPath =
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/callback");

  const token = request.cookies.get("token");

  let userData = null;

  if (token) {
    try {
      const { payload } = await jose.jwtVerify(token.value, JWT_SECRET);
      userData = payload;
      //   eslint-disable-next-line
    } catch (error: any) {
      console.error("Invalid token:", error.message);
    }
  }

  const isAdmin = userData?.role == "admin";
  // redirect users to homepage if they are not admin

  if (path.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (path === "/admin" && isAdmin) {
    return NextResponse.redirect(
      new URL("/admin/dashboard?tab=0", request.nextUrl)
    );
  }

  if (isProtectedPath && !userData) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("post_login_redirect", path, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  } else if (userData && isPublicPath) {
    //prevent users from visiting login page if they are already logged in
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/create",
    "/register",
    "/callback",
    "/api",
    "/api/me",
    "/api/my-blogs",
    "/me",
    "/me/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
