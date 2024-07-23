import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { convertToHandle, createUserAvatar } from "@/lib/utils";

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
  picture: string;
  handle: string;
  password_digest: string;
};
type RequestData = {
  username: string;
  email: string;
  password: string;
  role?: string;
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
//ensure emails and usernames are saved as lowercase letters. Admin cannot use this route when creating new users
export async function POST(req: NextRequest, res: NextResponse) {
  const requestData = (await req.json()) as RequestData;
  const isValidEmail = validateEmail(requestData.email);

  const email = requestData.email.toLowerCase();
  const handle = convertToHandle(requestData.username);

  if (!isValidEmail) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 422 }
    );
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { handle: handle }],
    },
    select: {
      email: true,
      handle: true,
    },
  });

  if (existingUser) {
    const normalizedEmail = existingUser.email.toLowerCase();
    if (normalizedEmail === email && existingUser.handle === handle) {
      return NextResponse.json(
        { error: "Both email and username are already taken" },
        { status: 422 }
      );
    } else if (normalizedEmail === email) {
      return NextResponse.json(
        { error: "Email is already taken" },
        { status: 422 }
      );
    } else if (existingUser.handle === handle) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 422 }
      );
    }
  }
  const data: UserData = {
    username: requestData.username.toLowerCase(),
    picture: createUserAvatar(requestData.username),
    email: email,
    handle: handle,
    password_digest: await hashPassword(requestData.password),
  };
  try {
    const user = await prisma.user.create({
      data: data,
      include: {
        socialMedia: {
          select: {
            platform: true,
            handle: true,
          },
        },
      },
    });
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
    console.error("something went wrong", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
