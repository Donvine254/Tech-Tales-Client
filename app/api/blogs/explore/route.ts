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

  try {
    const user = await prisma.user.findFirst({
      where: {
        handle: handle,
      },
      select: {
        id: true,
        username: true,
        handle: true,
        picture: true,
        bio: true,
        role: true,
        createdAt: true,
        socials: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
      cacheStrategy: { ttl: 60 },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const blogs = await prisma.blog.findMany({
      where: {
        author: {
          handle: handle,
        },
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

    return NextResponse.json({ user, blogs }, { status: 200 });
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
