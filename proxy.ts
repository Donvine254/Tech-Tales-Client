import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PROTECTED = ["/me", "/posts", "/api", "/admin"];
const PUBLIC_ONLY = ["/login", "/register"];

function isProtected(path: string) {
  return PROTECTED.some((p) => path.startsWith(p));
}

function isPublicOnly(path: string) {
  return PUBLIC_ONLY.some((p) => path.startsWith(p));
}

function redirectToLogin(request: NextRequest, path: string) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set("post_login_redirect", path, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 5,
    path: "/",
  });
  return response;
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (isProtected(path)) return redirectToLogin(request, path);
    return NextResponse.next();
  }

  try {
    await jose.jwtVerify(token, JWT_SECRET);
    if (isPublicOnly(path))
      return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  } catch {
    const response = isProtected(path)
      ? redirectToLogin(request, path)
      : NextResponse.next();

    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/posts/new",
    "/posts/:path*",
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
