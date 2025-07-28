"use server";
import { revalidatePath, unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { getSession } from "./session";
import { BlogData } from "@/types";
import { BlogStatus, Prisma } from "@prisma/client";
import { canPublishBlog } from "../helpers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
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
// function to publishblog
export async function publishBlog(
  data: Required<Omit<BlogData, "audio">> & {
    audio?: string | null;
  },
  uuid: string
) {
  const validation = canPublishBlog(data);
  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
    };
  }
  try {
    const blog = await prisma.blog.update({
      where: {
        uuid: uuid,
      },
      data: {
        ...data,
        status: "PUBLISHED",
        image: data.image as Prisma.InputJsonValue,
      },
      include: {
        author: {
          select: { handle: true },
        },
      },
    });
    revalidateTag("author-blogs");
    revalidateTag("blogs");
    revalidateTag("latest");
    return {
      success: true,
      message: "Blog published successfully",
      slug: blog.slug,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    // check unique constraint-violation
    if (error.code === "P2002") {
      return {
        success: false,
        message: "A blog with a similar title already exists.",
      };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  } finally {
    await prisma.$disconnect();
  }
}
// function to delete blog post
export async function deleteOrArchiveBlog(uuid: string) {
  try {
    // Fetch current blog status
    const blog = await prisma.blog.findUnique({
      where: { uuid },
      select: {
        status: true,
        author: {
          select: { handle: true },
        },
      },
    });
    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }
    if (blog.status === "DRAFT" || blog.status === "ARCHIVED") {
      await prisma.blog.delete({
        where: { uuid },
      });

      return {
        success: true,
        message: "Draft blog deleted successfully",
      };
    }

    if (blog.status === "PUBLISHED" || blog.status === "UNPUBLISHED") {
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
    revalidateTag("featured");
    revalidateTag("latest");
    revalidateTag("trending");
    revalidateTag("author-blogs");
    revalidateTag("blogs");
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
  } finally {
    await prisma.$disconnect();
  }
}

// function to getAllBlogs
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

// function to get blogs by author handle
export const getUserAndBlogsByHandle = unstable_cache(
  async (handle: string) => {
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
      redirect("/404");
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
  ["author-blogs"],
  {
    revalidate: 6000,
    tags: ["user-blogs"],
  }
);

export async function updateBlogStatus(status: BlogStatus, blogId: number) {
  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        status: status,
      },
    });
    revalidateTag("author-blogs");
    revalidateTag("user-blogs");
    revalidateTag("featured");
    revalidateTag("latest");
    revalidateTag("trending");
    revalidateTag("blogs");
    revalidatePath("/me/posts");
    return {
      success: true,
      message: "Blog status updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Record to update not found",
    };
  } finally {
    await prisma.$disconnect();
  }
}
