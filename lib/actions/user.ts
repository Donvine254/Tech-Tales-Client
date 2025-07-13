"use server";
import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";

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

export const getUserData = unstable_cache(
  async (userId: number) => {
    if (!userId) {
      redirect("/");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      redirect("/login");
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
        views: "desc",
      },
      take: 5,
    });

    return { user, blogs };
  },
  ["author-blogs"],
  {
    revalidate: 600,
    tags: ["user-blogs"],
  }
);
