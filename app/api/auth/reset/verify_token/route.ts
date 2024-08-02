import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, otpCode } = await req.json();
  let otpEntry: any;
  try {
    otpEntry = await prisma.OTP.findFirst({
      where: {
        email: email,
        code: otpCode,
      },
    });

    if (!otpEntry) {
      return NextResponse.json(
        { error: "Wrong OTP Provided" },
        { status: 404 }
      );
    }

    if (new Date() > otpEntry.expiresAt) {
      return NextResponse.json(
        { error: "The OTP code has expired" },
        { status: 401 }
      );
    }
    const reset_token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const response = NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 202 }
    );
    response.cookies.set("reset_token", reset_token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  } finally {
    if (otpEntry) {
      await prisma.OTP.delete({
        where: {
          id: otpEntry.id,
        },
      });
    }
    await prisma.$disconnect();
  }
}
