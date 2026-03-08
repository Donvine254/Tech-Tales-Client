import { type NextRequest, NextResponse } from "next/server";
import { authenticateSSOLogin } from "@/lib/actions/auth";

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const postLoginRedirect = req.cookies.get("post_login_redirect")?.value;

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_token", req.url),
    );
  }

  const userInfo = await fetchUserInfo(code);
  if (!userInfo) {
    return NextResponse.redirect(
      new URL("/login?error=missing_email", req.url),
    );
  }
  // authenticateSSOLogin handles both new and existing users,
  // and calls createSession internally — same as your Google flow
  const result = await authenticateSSOLogin(
    {
      email: userInfo.email || userInfo.notification_email,
      username: userInfo.name || userInfo.email?.split("@")[0],
      picture: userInfo.avatar_url,
    },
    "github",
  );

  if (!result.success) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(result?.error ?? result?.message ?? "SSO login failed")}`,
        req.url,
      ),
    );
  }
  // Session is already created by authenticateSSOLogin, just redirect
  return NextResponse.redirect(new URL(postLoginRedirect ?? "/", req.url));
}

async function getAccessToken(code: string) {
  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      },
    );
    const tokenData = await tokenResponse.json();
    return tokenData.access_token ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchUserInfo(code: string) {
  const accessToken = await getAccessToken(code);
  if (!accessToken) return null; // explicit null, not undefined
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userInfo = await response.json();
  if (!userInfo?.email) return null;
  return userInfo;
}
