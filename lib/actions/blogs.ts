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

      take: 18,
    });

    return blogs;
  },
  ["blogs"],
  { revalidate: 600 }
);

export const getLatestBlogs = unstable_cache(
  async () => {
    const latestBlogs = await prisma.blog.findMany({
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
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return latestBlogs;
  },
  ["latest"],
  { revalidate: 600 }
);

export const getTrendingBlogs = unstable_cache(
  async () => {
    const trendingBlogs = await prisma.blog.findMany({
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
      orderBy: { likes: "desc" },
      take: 10,
    });

    return trendingBlogs;
  },
  ["latest"],
  { revalidate: 600 }
);
