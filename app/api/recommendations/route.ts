import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { tags } = await req.json();
  const tagsArray = tags.split(",").map((tag) => tag.trim());
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        OR: tagsArray.map((tag) => ({
          tags: {
            contains: tag,
          },
        })),
      },
      take: 5,
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching blogs" },
      { status: 500 }
    );
  }
}
