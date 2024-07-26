import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/utils";
import { decodeUserToken } from "@/lib/decodeToken";
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

type UserData = {
  username: string;
  email: string;
  picture: string;
  handle: string;
  status?: string;
  password_digest: string;
};
type RequestData = {
  username: string;
  email: string;
  password: string;
  handle: string;
  picture: string;
  status: string;
};

export async function GET(req: NextRequest) {
  const userData = await decodeUserToken(req);

  if (!userData || userData.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized request." },
      { status: 401 }
    );
  }

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
  let { username, picture, password, email, handle } =
    (await req.json()) as RequestData;
  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 422 }
    );
  }
  email = email.toLowerCase();

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
    if (existingUser.email === email) {
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

  try {
    const data: UserData = {
      username: username.toLowerCase(),
      picture: picture,
      email: email,
      handle: handle,
      status: "INACTIVE",
      password_digest: await hashPassword(password),
    };
    const user = await prisma.user.create({
      data: data,
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
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("something went wrong", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

//function patch users: THIS IS AN ADMIN ROUTE ONLY
type PatchData = {
  username?: string;
  picture?: string;
  bio?: string;
  handle?: string;
  role?: string;
};
export async function PATCH(req: NextRequest, res: NextResponse) {
  const userData = await decodeUserToken(req);
  const { username, bio, picture, handle, role } =
    (await req.json()) as PatchData;
  const id = req.nextUrl.searchParams.get("id") as string;
  if (!userData && userData.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized request!" },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        handle,
        bio,
        picture,
        role,
      },
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
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    console.error(e);
    if (e.code === "P2002") {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 409 }
      );
    } else if (e.code === "P2025") {
      return NextResponse.json(
        { error: "Record to update not found" },
        { status: 409 }
      );
    } else {
      return NextResponse.json(e, { status: 500 });
    }
  } finally {
    await prisma.$disconnect();
  }
}
