import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  const suspensionMs = 5 * 60 * 1000;
  const now = Date.now();
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase(), deleted: false },
    });
    if (!user) {
      return NextResponse.json(
        { error: "No user with matching email found" },
        { status: 404 }
      );
    }
    //run this only if user status is not Inactive
    if (user.status !== "INACTIVE" && user.status !== "ACTIVE") {
      if (user.status === "DEACTIVATED") {
        const deactivatedAt = new Date(user.deactivatedAt);
        const timeDiff = now - deactivatedAt.getTime();
        const remainingMinutes = Math.ceil((suspensionMs - timeDiff) / 60000);
        if (remainingMinutes > 0) {
          return NextResponse.json(
            {
              error: `This user account has been ${user.status.toLowerCase()}. Please try again in ${remainingMinutes} minutes.`,
            },
            { status: 404 }
          );
        }
      }
      if (user.status === "SUSPENDED") {
        return NextResponse.json(
          {
            error:
              "This user account has been suspended. Please contact your administrator",
          },
          { status: 404 }
        );
      }
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_digest
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password, please try again!" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "8h" });

    // Return user details and token
    const response = NextResponse.json(user, { status: 200 });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
