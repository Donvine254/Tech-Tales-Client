import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { slugify } from "@/lib";

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
  const { blogData } = await req.json();
  const data = {
    ...blogData,
    slug: slugify(blogData.slug),
  };
  if (data) {
    try {
      const blog = await prisma.blog.create({
        data: data,
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
      });
      return NextResponse.json(blog, { status: 201 });
    } catch (error) {
      console.error(error);
      if (error instanceof prisma.PrismaClientValidationError) {
        return NextResponse.json(
          { error: "Invalid blog data." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "An error occurred while creating the blog." },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json(
      { error: "Invalid blog data provided" },
      { status: 409 }
    );
  }
}
