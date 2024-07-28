import { decodeUserToken } from "@/lib/decodeToken";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Blog = {
  authorId: number;
  title: string;
  body: string;
  slug?: string;
  image?: string;
  tags?: string;
};

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
      cacheStrategy: { ttl: 60 },
    });

    // Format blogs data if needed

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

export async function POST(req: NextRequest, res: NextResponse) {
  const { authorId, title, image, slug, body, tags } =
    (await req.json()) as Blog;

  try {
    await prisma.blog.create({
      data: {
        authorId,
        title,
        image,
        slug,
        body,
        tags,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "A blog with similar title exists, kindly choose a different title!",
        },
        { status: 409 }
      );
    } else
      return NextResponse.json(
        { error: "An error occurred while creating the blog." },
        { status: 500 }
      );
  } finally {
    await prisma.$disconnect();
  }
}

