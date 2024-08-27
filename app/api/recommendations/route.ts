import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { tags, blogId } = await req.json();
  const tagsArray = tags.split(",").map((tag) => tag.trim());
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        OR: tagsArray.map((tag) => ({
          tags: {
            contains: tag,
            mode: "insensitive",
          },
        })),
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
      take: 6,
    });
    const filteredBlogs = blogs.filter((blog) => blog.id !== Number(blogId));
    return NextResponse.json(filteredBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching blogs" },
      { status: 500 }
    );
  }
}
