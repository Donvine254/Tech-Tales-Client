import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath =
    path.startsWith("/me") ||
    path.startsWith("/my-blogs") ||
    path.startsWith("/create");

  const token = request.cookies.get("token");
  if (isProtectedPath && !token) {
    const redirectPath = path.slice(1);
    return NextResponse.redirect(
      new URL(`/login?post_login_redirect_url=${redirectPath}`, request.nextUrl)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/create",
    "/me",
    "/me/:path*",
    "/my-blogs",
    "/my-blogs/:path*",
  ],
};
