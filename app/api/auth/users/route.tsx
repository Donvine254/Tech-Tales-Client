import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

type userData = {
  username: string;
  password: string;
  email: string;
  bio?: string;
  picture?: string;
  role?: string;
};

const createUserAvatar = (username: string) => {
  return `https://ui-avatars.com/api/?background=random&name=${username}`;
};

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const data: userData = await req.json();
  const createData = {
    email: data.email,
    password_digest: await bcrypt.hash(data.password, 10),
    picture: createUserAvatar(data.username),
    role: data.role ?? "user",
  };
  try {
    const user = await prisma.users.create({
      data: {
        ...createData,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    return NextResponse.json(
      {
        errors: error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
