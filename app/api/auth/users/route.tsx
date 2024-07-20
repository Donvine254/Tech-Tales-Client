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

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const data: userData = await req.json();

    // Check if email or username already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { errors: ["Email or username already exists"] },
        { status: 409 }
      );
    }
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { errors: ["Invalid email format"] },
        { status: 400 }
      );
    }

    const createData = {
      email: data.email,
      username: data.username,
      password_digest: await bcrypt.hash(data.password, 10),
      picture: createUserAvatar(data.username),
      role: data.role ?? "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = await prisma.users.create({
      data: createData,
    });

    return NextResponse.json(
      {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        bio: user.bio ?? "",
        picture: user.picture,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { errors: ["Internal server error"] },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

//PATCH function

type PatchData = {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  picture?: string;
  bio?: string;
};

export async function PATCH(req: NextRequest, res: NextResponse) {
  // in this route, a user can only patch other users if the user is admin or is authenticated and trying to patch own details. If the user is admin, the admin can patch almost anything include email address and role ("user,admin"). However, users can only patch their username, picture, bio and password
  const token = req.cookies.get("token");
  if (req.method !== "PATCH") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  if (!token) {
    return NextResponse.json(
      { message: "Unathorized Request" },
      { status: 401 }
    );
  } else {
    const userData = await getDataFromToken(req);
    if (!userData) {
      return NextResponse.json(
        { message: "Unathorized Request" },
        { status: 401 }
      );
    }
    return NextResponse.json({ userData }, { status: 200 });
  }
}
