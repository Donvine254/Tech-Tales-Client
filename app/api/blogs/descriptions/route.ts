import { generateDescription } from "@/lib/helpers";
import { calculateReadingTime } from "@/lib/utils";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        body: true,
        id: true,
      },
    });

    const descriptions = blogs.map((blog) => ({
      id: blog.id,
      description: generateDescription(blog.body || ""),
      reading_time: calculateReadingTime(blog.body || ""),
    }));

    return NextResponse.json(descriptions);
    return NextResponse.json(descriptions);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
