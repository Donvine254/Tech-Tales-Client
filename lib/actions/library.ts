"use server";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { cachedCall } from "./cache";
import { isVerifiedUser } from "@/dal/auth-check";

export async function getUserFavorites() {
  const user = await isVerifiedUser();
  const userId = Number(user.userId);
  return cachedCall(
    [userId],
    `user-${userId}:favorites`,
    async (userId: number) => {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId,
          blog: {
            status: "PUBLISHED",
          },
        },
        select: {
          blog: {
            select: {
              status: true,
              ...blogSelect,
            },
          },
        },
      });

      if (!favorites) {
        return [];
      }

      return favorites.map((fav) => fav.blog);
    },
    {
      tags: [`user-${userId}:favorites`, "favorites"],
      revalidate: 600, // 10 minutes
    }
  );
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
      select: {
        status: true,
        ...blogSelect,
      },
    });

    return blogs;
  } catch (error) {
    console.error("Failed to fetch bookmarked blogs:", error);
    return [];
  }
}
