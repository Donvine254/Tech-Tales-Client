// pages/api/login.js
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const data = await req.json();
  const oneDay = 24 * 60 * 60 * 1000;
  if (data) {
    try {
      // Check if the user exists
      const user = await prisma.users.findFirst({
        where: { email: data?.email.toString() },
      });

      if (!user) {
        return NextResponse.json(
          { errors: ["User not found"] },
          { status: 404 }
        );
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password_digest
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { errors: ["Invalid password, please try again"] },
          { status: 401 }
        );
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.id.toString() },
        process.env.JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );
      // set cookies
      cookies().set({
        name: "auth_token",
        value: token,
        expires: Date.now() - oneDay,
      });
      // Return user details and token
      return NextResponse.json(
        {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          picture: user.picture,
          socials: user.socials,
          bio: user.bio,
          role: user.role,
        },
        { status: 200 }
      );
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

export async function GET(req, res) {
  return NextResponse.json(
    { error: "Not login parameters provided" },
    { status: 201 }
  );
}
