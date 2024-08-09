import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/utils";
import { sendWelcomeEmail } from "@/emails";
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

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
  handle: string;
  picture: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  let { username, email, password, handle, picture } =
    (await req.json()) as RequestData;
  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 422 }
    );
  }
  let success: boolean = false;
  email = email.toLowerCase();
  username = username.toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      handle: handle,
    },
    select: {
      handle: true,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Username is already taken" },
      { status: 422 }
    );
  }
  const data: UserData = {
    username: username,
    picture: picture,
    email: email,
    handle: handle,
    password_digest: await hashPassword(password),
  };
  try {
    const user = await prisma.user.create({
      data: data,
    });

    // Generate a JWT token
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Return user details and token
    const response = NextResponse.json(
      user,

      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    success = true;
    return response;
  } catch (error) {
    console.error("something went wrong", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    if (success) {
      sendWelcomeEmail(email, username.toUpperCase());
    }
    await prisma.$disconnect();
  }
}

//get specific prisma error message
// if (error.code === "P2002") {
//   return NextResponse.json(
//     { error: `${error.meta.target[0]} is already taken` },
//     { status: 409 }
//   );
// }
