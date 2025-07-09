"use server";
import { unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { getSession } from "./session";
import { BlogData } from "@/types";
import { Prisma } from "@prisma/client";

// function to create a new blog

export async function createNewBlog() {
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, message: "user id is required" };
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        authorId: Number(session.userId),
        title: "Untitled Blog",
        status: "DRAFT",
      },
    });
    if (blog) {
      return { success: true, data: blog };
    } else {
      return { success: true, message: "blog creation failed" };
    }
  } catch (error) {
    console.error(error);
    return { success: true, message: "something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

// function to save draft blog
export async function SaveDraftBlog(data: BlogData, uuid: string) {
  try {
    await prisma.blog.update({
      where: { uuid },
      data: { ...data, image: data.image as Prisma.InputJsonValue },
    });
    return { success: true, message: "Blog in sync with database" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}
// function to delete blog post
export async function deleteOrArchiveBlog(uuid: string) {
  try {
    // Fetch current blog status
    const blog = await prisma.blog.findUnique({
      where: { uuid },
      select: { status: true },
    });

    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }

    if (blog.status === "DRAFT") {
      await prisma.blog.delete({
        where: { uuid },
      });

      return {
        success: true,
        message: "Draft blog deleted successfully",
      };
    }

    if (blog.status === "PUBLISHED") {
      await prisma.blog.update({
        where: { uuid },
        data: {
          status: "ARCHIVED",
        },
      });

      return {
        success: true,
        message: "Published blog archived successfully",
      };
    }
    return {
      success: false,
      message: `No action taken for blog with status '${blog.status}'`,
    };
  } catch (error) {
    console.error("Error deleting/archiving blog:", error);
    return {
      success: false,
      message: "Failed to delete or archive blog",
    };
  }
}

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
        status: {
          notIn: ["DRAFT", "UNPUBLISHED"],
        },
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
