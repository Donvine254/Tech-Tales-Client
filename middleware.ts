import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath =
    path.startsWith("/me") || path.startsWith("/my-blogs");

  const token = request.cookies.get("token");
  if (isProtectedPath && !token) {
    return NextResponse.redirect(
      new URL(`/login?post_login_redirect_url=${path}`, request.nextUrl)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/me",
    "/me/:path*",
    "/my-blogs",
    "/my-blogs/:path*",
  ],
};
