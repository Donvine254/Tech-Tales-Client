"use server";
import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";

// function to getAllUserBlogs
export const getUserBlogs = unstable_cache(
  async (userId: number) => {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
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
    });

    return blogs;
  },
  ["user-blogs"],
  { revalidate: 600 }
);
