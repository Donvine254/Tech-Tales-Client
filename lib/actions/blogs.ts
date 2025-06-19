"use server";
import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
export const getBlogs = unstable_cache(
  async () => {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
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
      orderBy: {
        createdAt: "desc",
      },
      take: 9,
    });

    return blogs;
  },
  ["blogs"],
  { revalidate: 600 }
);
