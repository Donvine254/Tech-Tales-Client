import { NextResponse, NextRequest } from "next/server";

export async function GET(res: NextRequest) {
  // set user status as inactive
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
