import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const orderByField = searchParams.get("orderBy") as
    | "createdAt"
    | "views"
    | "likes"
    | null;

  const limitParam = searchParams.get("limit");
  if (limitParam !== null) {
    const parsed = parseInt(limitParam, 10);
    if (isNaN(parsed) || parsed <= 0) {
      return NextResponse.json(
        { error: "Invalid 'limit' param" },
        { status: 400 }
      );
    }
  }

  const limit = limitParam !== null ? parseInt(limitParam, 10) : undefined;

  try {
    const blogs = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: { select: { username: true, picture: true } },
        _count: { select: { comments: true } },
      },
      ...(orderByField && {
        orderBy: { [orderByField]: "desc" },
      }),
      ...(limit && { take: limit }),
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
