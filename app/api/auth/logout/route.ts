import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prisma";
export async function GET(res: NextRequest) {
  const id = res.nextUrl.searchParams.get("id");

  // set user status as inactive
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
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
    await prisma.$disconnect();
  }
}
