import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedPath =
    path.startsWith("/me") ||
    path.startsWith("/posts") ||
    path.startsWith("/api");

  const isPublicPath =
    path.startsWith("/login") || path.startsWith("/register");

  const token = request.cookies.get("token");
  try {
    if (token) {
      await jose.jwtVerify(token.value, JWT_SECRET);

      if (isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else if (isProtectedPath) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("post_login_redirect", path, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      return response;
    }
  } catch (error) {
    const e = error as Error;
    console.warn("Invalid token", e.message);
    if (isProtectedPath) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("post_login_redirect", path, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      return response;
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/posts/new",
    "/posts/:path*",
    "/register",
    "/callback",
    "/api",
    "/api/me",
    "/api/blogs",
    "/api/my-blogs",
    "/me",
    "/me/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
