import { getDataFromToken } from "@/lib/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const userData = await getDataFromToken(req);
    if (!userData || !userData) {
      return new NextResponse(null, { status: 400 });
    } else return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 400 });
  }
}
