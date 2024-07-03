import { getDataFromToken } from "@/lib/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const userData = await getDataFromToken(req);
    if (!userData || !userData) {
      return NextResponse.rewrite(new URL("/login", req.url));
    } else return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "No logged in user found" },
      { status: 400 }
    );
  }
}
