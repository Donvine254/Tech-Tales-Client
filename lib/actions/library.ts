"use server";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";

export async function getUserFavorites(userId: number) {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
      blog: {
        status: "PUBLISHED",
      },
    },
    select: {
      blog: {
        select: blogSelect,
      },
    },
  });
  if (!favorites) {
    return [];
  }
  return favorites.map((fav) => fav.blog);
}

// function to fetch bookmarked blogs
export async function getBlogsByIds(blogIds: number[]) {
  try {
    if (!blogIds || blogIds.length === 0) return [];

    const blogs = await prisma.blog.findMany({
      where: {
        id: {
          in: blogIds.map(Number),
        },
        status: "PUBLISHED",
      },
      select: blogSelect,
    });

    return blogs;
  } catch (error) {
    console.error("Failed to fetch bookmarked blogs:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
