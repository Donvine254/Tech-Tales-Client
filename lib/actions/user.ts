"use server";
import { revalidateTag, unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { SocialLink } from "@/types";
import { getSession } from "./session";
import { Prisma } from "@prisma/client";

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

// function to saveuser socials

export async function updateSocials(data: SocialLink[]) {
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, message: "No logged-in user found" };
  }
  try {
    const user = await prisma.user.update({
      where: { id: Number(session.userId) },
      data: {
        socials: data as unknown as Prisma.InputJsonValue, // ✅ fix type error
      },
      select: {
        socials: true, // ✅ only return socials
      },
    });
    // ✅ revalidate relevant tags
    revalidateTag("author-blogs");
    revalidateTag("user-blogs");
    return {
      success: true,
      socials: user.socials,
      message: "Socials updated successfully",
    };
  } catch (error) {
    console.error("Failed to update socials", error);
    return {
      success: false,
      message: "Something went wrong while updating socials",
    };
  }
}
