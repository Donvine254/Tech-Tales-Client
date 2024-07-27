import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const userData = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
        status: {
          not: "SUSPENDED",
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No User With Matching Email Found" },
        { status: 404 }
      );
    }

    const tokenData = user;

    // Generate a JWT token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    const response = NextResponse.json(user, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        errors: ["Internal server error"],
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
