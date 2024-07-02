// pages/api/login.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const data = await req.json();
  console.log(data);
  try {
    // Check if the user exists
    const user = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return res.status(404).json({ errors: ["User not found"] });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_digest
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ errors: ["Invalid password, please try again."] });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Return user details and token
    return res.status(200).json({
      user: {
        id: user.id.toString(),
        email: user.email,
        picture: user.picture,
        socials: user.socials,
        bio: user.bio,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Internal server error"] });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

export async function GET(req, res) {
  return NextResponse.json({ error: "Not login parameters provided" });
}
