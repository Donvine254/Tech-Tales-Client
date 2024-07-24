import { getDataFromToken } from "@/lib/decodeToken";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userData = await getDataFromToken(req);
    let responseData = userData;
    if (!userData || !userData) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    } else {
      if (userData.status !== "ACTIVE") {
        await prisma.user.update({
          where: {
            id: Number(userData.id),
          },
          data: {
            status: "ACTIVE",
          },
          select: {
            status: true,
          },
        });
        responseData = {
          ...userData,
          status: "ACTIVE",
        };
      }
      return NextResponse.json(responseData, { status: 200 });
    }
  } catch (error) {
    return new NextResponse(null, { status: 400 });
  }
}
