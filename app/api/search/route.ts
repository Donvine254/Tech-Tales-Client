import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { search } = await req.json();

  try {
    // First, try to find blogs by tag
    let blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
        tags: {
          contains: search.toString(),
          mode: "insensitive",
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
      cacheStrategy: { ttl: 60 },
    });

    // If no blogs are found by tag, search by title
    if (blogs.length === 0) {
      blogs = await prisma.blog.findMany({
        where: {
          status: "PUBLISHED",
          title: {
            contains: search.toString(),
            mode: "insensitive",
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
        cacheStrategy: { ttl: 600 },
      });
    }

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
