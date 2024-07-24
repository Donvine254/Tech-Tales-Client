import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prisma";
export async function GET(res: NextRequest) {
  const id = res.nextUrl.searchParams.get("id");
  if (id) {
    //set user status as inactive
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "INACTIVE",
      },
    });
  }
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
