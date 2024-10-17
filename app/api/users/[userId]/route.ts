import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { decodeUserToken } from "@/lib/decodeToken";
import jwt from "jsonwebtoken";

type PatchData = {
  username?: string;
  picture?: string;
  bio?: string;
  handle?: string;
  branding?: string;
  preferences?: {
    cookies: boolean;
    analytics: boolean;
    email_notifications: boolean;
    newsletter_subscription: boolean;
  };
};

export async function GET(request: NextRequest, { params }) {
  const id = params.userId;
  if (!id) {
    return NextResponse.json({
      message: "No user ID provided!",
    });
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: Number(id),
        status: "PUBLISHED",
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            handle: true,
            branding: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error occurred while fetching blogs." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req: NextRequest, { params }) {
  const userData = await decodeUserToken(req);
  const id = params.userId;
  if (!userData && userData.id !== id) {
    return NextResponse.json(
      { error: "Unauthorized request!" },
      { status: 401 }
    );
  }
  const { username, bio, picture, handle, preferences, branding } =
    (await req.json()) as PatchData;

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
        preferences,
        branding,
      },
    });
    // Generate a JWT token
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "8h" });

    // Return user details and token
    const response = NextResponse.json(user, { status: 201 });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
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
