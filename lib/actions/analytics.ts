"use server";
import prisma from "@/prisma/prisma";

export async function getTopAuthor(userId: number) {
  if (!userId) return false;
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
      take: 1,
    });

    return topAuthor.length > 0 && topAuthor[0].authorId === userId;
  } catch (error) {
    console.error("Error determining top author:", error);
    return false;
  }
}
