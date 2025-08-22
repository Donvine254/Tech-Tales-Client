"use server";
import { redirect } from "next/navigation";
import { blogSelect } from "@/prisma/select";
import prisma from "@/prisma/prisma";
import { cachedCall } from "./cache";
import { cache } from "react";
/*
This page fetches user data and blogs based on the user's handle.
It uses the unstable_cache function to cache the results for performance optimization.
*/

export const getUserIdByHandle = cache(async (handle: string) => {
  if (!handle) redirect("/404?message=user_not_found");
  const user = await prisma.user.findFirst({
    where: { handle, deactivated: false },
    select: { id: true },
  });

  if (!user) redirect("/404?message=user_not_found");
  return user.id;
});

export const getUserAndBlogsByHandle = async (userId: number) => {
  return cachedCall(
    [userId],
    `author-${userId}:data`,
    async (userId: number) => {
      const user = await prisma.user.findFirst({
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
        redirect("/404?message=user_not_found");
      }
      const blogs = await prisma.blog.findMany({
        where: {
          authorId: user.id,
          status: "PUBLISHED",
        },
        select: {
          status: true,
          ...blogSelect,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { user, blogs };
    },
    {
      tags: [`author-${userId}:data`, "blogs"],
      revalidate: 600, // revalidate every 1hr
    }
  );
};
