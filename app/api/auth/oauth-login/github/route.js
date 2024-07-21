import { NextResponse } from "next/server";
import { getAccessToken, fetchUserInfo } from "@/lib";

export async function POST(req, res) {
  const data = await req.json();
  const token = await getAccessToken(data.code);
  const userData = await fetchUserInfo(token);
  return NextResponse.json(userData);
}
