import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, code } = await req.json();
  let otpEntry: any;
  try {
    otpEntry = await prisma.OTP.findFirst({
      where: {
        email: email,
        code: code,
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

    const response = NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );

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
