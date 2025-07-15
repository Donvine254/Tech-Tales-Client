import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import * as jose from "jose";
import { baseUrl } from "@/lib/utils";
const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=missing_token`);
  }
  const userInfo = await fetchUserInfo(code);
  if (!userInfo) {
    return NextResponse.redirect(`${baseUrl}/login?error=missing_email`);
  }
  console.log(userInfo);
  //   step-1: find the user in db
  const user = await prisma.user.findUnique({
    where: {
      email: userInfo.email,
    },
  });
  //   step-2: set cookie and redirect
  if (user) {
    const token = await new jose.SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      picture: user.picture,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    const response = NextResponse.redirect(`${baseUrl}/login`);

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production", // always use secure in prod
    });

    return response;
  } else {
    // when there is no user
    return NextResponse.redirect(`${baseUrl}/login?error=missing_user`);
  }
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
      }
    );
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    return accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchUserInfo(code: string) {
  const accessToken = await getAccessToken(code);
  if (accessToken) {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();
    if (!userInfo || !userInfo.email) {
      return null;
    }
    return userInfo;
  }
}
