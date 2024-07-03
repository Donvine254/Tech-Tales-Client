import { getDataFromToken } from "@/lib/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const userData = await getDataFromToken(req);
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
