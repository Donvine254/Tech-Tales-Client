import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { handle } = await req.json();

  if (!handle) {
    return NextResponse.json(
      { error: "Kindly provide a handle first" },
      { status: 404 }
    );
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        handle: handle,
        status: "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the user." },
      { status: 500 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { error: "No user with matching handle found" },
      { status: 404 }
    );
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: user.id,
        status: "PUBLISHED",
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
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
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching blogs." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
