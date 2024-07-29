import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
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
        likes: "desc",
      },
      take: 5,
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
