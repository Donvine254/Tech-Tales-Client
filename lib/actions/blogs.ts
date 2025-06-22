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

const createBlogFetcher = (
  orderByField: "createdAt" | "views" | "likes",
  cacheKey: string
) =>
  unstable_cache(
    async () => {
      return await prisma.blog.findMany({
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
          [orderByField]: "desc",
        },
        take: 10,
      });
    },
    [cacheKey],
    { revalidate: 600 }
  );
export const getLatestBlogs = createBlogFetcher("createdAt", "latest");
export const getTrendingBlogs = createBlogFetcher("views", "trending");
export const getFeaturedBlogs = createBlogFetcher("likes", "featured");
