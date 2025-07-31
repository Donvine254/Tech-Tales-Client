import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        path: true,
        description: true,
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
