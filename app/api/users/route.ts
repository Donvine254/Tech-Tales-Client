import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const createUserHandle = (username: string) => {
  return username.replace(/\s+/g, "").toLowerCase();
};

const createUserAvatar = (username: string) => {
  return `https://ui-avatars.com/api/?background=random&name=${username}`;
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

type UserData = {
  username: string;
  email: string;
  password: string;
  picture?: string;
  role?: string;
  handle?: string;
};

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        picture: true,
        handle: true,
        bio: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

//function to create new users
export async function POST(req: NextRequest, res: NextResponse) {
  const requestData = (await req.json()) as UserData;
  const isValidEmail = validateEmail(requestData.email);
  if (!isValidEmail) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 422 }
    );
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: requestData.email }, { username: requestData.username }],
    },
    select: {
      email: true,
      username: true,
    },
  });

  if (existingUser) {
    if (
      existingUser.email === requestData.email &&
      existingUser.username === requestData.username
    ) {
      return NextResponse.json(
        { error: "Both email and username are already taken" },
        { status: 422 }
      );
    } else if (existingUser.email === requestData.email) {
      return NextResponse.json(
        { error: "Email is already taken" },
        { status: 422 }
      );
    } else if (existingUser.username === requestData.username) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 422 }
      );
    }
  }
  const data = {
    ...requestData,
    avatar: createUserAvatar(requestData.username),
    handle: createUserHandle(requestData.username),
    password_digest: await hashPassword(requestData.password),
  };
  return NextResponse.json(data);
}
