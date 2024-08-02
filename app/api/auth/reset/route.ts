import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
import { NextResponse, NextRequest } from "next/server";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export async function POST(req: NextRequest, res: NextResponse) {
  const { currentPassword, newPassword, id } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        password_digest: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Record to update not found" },
        { status: 404 }
      );
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_digest
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password, please try again!" },
        { status: 401 }
      );
    } else {
      await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          password_digest: await hashPassword(newPassword),
        },
      });
      return NextResponse.json(
        { success: "Password updated successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

//modify patch request
export async function PATCH(req: NextRequest, res: NextResponse) {
  const { password, email } = await req.json();
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password_digest: await hashPassword(password),
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Oops! we couldn't find your account" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
