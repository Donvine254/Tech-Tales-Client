import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        tags: true,
      },
      cacheStrategy: { ttl: 3600 },
    });

    const uniqueTags = new Set();

    blogs.forEach((blog: any) => {
      const tagsArray = (blog.tags ?? "")
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(tag => tag.length > 0); // remove empty tags

      tagsArray.forEach((tag: string) => uniqueTags.add(tag.toLowerCase()));
    });

    const tagsList = Array.from(uniqueTags).sort();

    return NextResponse.json(tagsList);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.error();
  }
}


