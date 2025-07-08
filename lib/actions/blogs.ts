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

//function to get all blogs;potential duplication; do not remove
export const getAllBlogs = unstable_cache(
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
    });

    return blogs;
  },
  ["search"],
  { revalidate: 6000 }
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

export const getUserAndBlogsByHandle = async (handle: string) =>
  unstable_cache(
    async () => {
      if (!handle) {
        throw new Error("Kindly provide a handle first");
      }
      const user = await prisma.user.findFirst({
        where: { handle },
        select: {
          id: true,
          username: true,
          handle: true,
          picture: true,
          bio: true,
          role: true,
          branding: true,
          skills: true,
          createdAt: true,
          socials: true,
          _count: {
            select: {
              comments: true,
              blogs: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const blogs = await prisma.blog.findMany({
        where: {
          authorId: user.id,
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
      });

      return { user, blogs };
    },
    [`user-blogs-${handle}`],
    { revalidate: 600 }
  )();
