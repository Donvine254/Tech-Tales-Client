import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map();

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  const ip = req.ip || req.headers.get("X-Forwarded-For");
  const limit = 3; // Limiting requests to 3 login attempts per minute per IP
  const windowMs = 60 * 1000; // 1 minute
  const suspensionMs = 5 * 60 * 1000; // 5 minutes

  // Function to limit requests to 3 login attempts per IP
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
      suspendedUntil: null,
    });
  }

  const ipData = rateLimitMap.get(ip);

  // Check if the IP is currently suspended
  if (ipData.suspendedUntil && Date.now() < ipData.suspendedUntil) {
    return NextResponse.json(
      { errors: ["Too Many Requests. Try again after 5 minutes"] },
      { status: 429 }
    );
  }

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    // Suspend the user for 5 minutes
    ipData.suspendedUntil = Date.now() + suspensionMs;
    return NextResponse.json(
      { errors: ["Too Many Requests. Try again after 5 minutes"] },
      { status: 429 }
    );
  }

  ipData.count += 1;

  if (email && password) {
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email: email, deleted: false },
        include: {
          socialMedia: {
            select: {
              platform: true,
              handle: true,
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json(
          { errors: ["No user with matching email found"] },
          { status: 404 }
        );
      }
      if (user.status !== "ACTIVE") {
        return NextResponse.json(
          {
            errors: [`This user account has been ${user.status.toLowerCase()}`],
          },
          { status: 404 }
        );
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_digest
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { errors: ["Invalid password, please try again!"] },
          { status: 401 }
        );
      }

      const tokenData = user;
      // Generate a JWT token
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      // Return user details and token
      const response = NextResponse.json(
        user,

        { status: 200 }
      );
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
      // Disconnect Prisma client
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json(
      {
        errors: ["Internal server error"],
      },
      { status: 500 }
    );
  }
}