import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const topAuthor = await prisma.blog.groupBy({
      by: ["authorId"],
      _count: {
        authorId: true,
      },
      orderBy: {
        _count: {
          authorId: "desc",
        },
      },
      take: 1, // Limit to the top author
    });

    if (topAuthor.length === 0) {
      return NextResponse.json(
        { message: "No authors found" },
        { status: 400 }
      );
    }

    // Return the top author's ID and the count of their blogs
    return NextResponse.json({
      authorId: topAuthor[0].authorId,
      blogCount: topAuthor[0]._count.authorId,
    });
  } catch (error) {
    console.error("Error fetching top author:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
