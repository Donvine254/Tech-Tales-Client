"use server";
import { revalidatePath, unstable_cache } from "next/cache";
import prisma from "@/prisma/prisma";
import { getSession } from "./session";
import { BlogData } from "@/types";
import { BlogStatus, Prisma } from "@prisma/client";
import { canPublishBlog, generateDescription } from "../helpers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { blogSelect } from "@/prisma/select";
import { calculateReadingTime } from "../utils";
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
  let reading_time = 0;
  if (data.body) {
    reading_time = calculateReadingTime(data.body || "");
  }
  try {
    const blog = await prisma.blog.update({
      where: { uuid },
      data: {
        ...data,
        image: data.image as Prisma.InputJsonValue,
        description: data.description?.trim()
          ? data.description
          : generateDescription(data.body || ""),
        reading_time,
      },
      select: {
        id: true,
        path: true,
        status: true,
      },
    });
    revalidateTag("user-blogs");
    if (data.path) {
      revalidatePath(`/read/${data.path}`);
    }
    return {
      success: true,
      message: "Blog in sync with database",
      data: blog,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message:
            "Unique constraint violation. A blog with a similar title already exists.",
        };
      }
    }
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something went wrong",
    };
  }
}
// function to publishblog
export async function publishBlog(
  data: Required<Omit<BlogData, "audio">> & {
    audio?: string | null;
    description?: string | null;
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
        description: data.description?.trim()
          ? data.description
          : generateDescription(data.body || ""),
        reading_time: calculateReadingTime(data.body || ""),
        image: data.image as Prisma.InputJsonValue,
      },
      select: {
        id: true,
        path: true,
      },
    });
    revalidateTag("user-blogs");
    revalidateTag("blogs");
    revalidateTag("latest");
    if (blog.path) {
      revalidatePath(`/read/${blog.path}`);
    }
    return {
      success: true,
      message: "Blog published successfully",
      url: blog.path,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message:
            "Unique constraint violation. A blog with a similar title already exists.",
        };
      }
    }
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something went wrong",
    };
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
/*This function gets user blogs based on their handles, used in the explore page. Should be refactored for single responsbility*/
export const getUserAndBlogsByHandle = unstable_cache(
  async (handle: string) => {
    if (!handle) {
      throw new Error("Kindly provide a handle first");
    }
    const user = await prisma.user.findFirst({
      where: { handle, deactivated: false },
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
  ["user-blogs"],
  {
    revalidate: 6000,
    tags: ["user-blogs"],
  }
);
/*This function only updates the blog status and can be used to archive or publish a blog*/
export async function updateBlogStatus(status: BlogStatus, blogId: number) {
  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        status: status,
      },
    });
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
/*This function only updates locks or unlocks the blog conversations to either allow or disallow commenting, existing comments will remain visible*/

export async function toggleDiscussion(id: number, show: boolean) {
  try {
    await prisma.blog.update({
      where: { id },
      data: {
        show_comments: show,
      },
    });
    revalidateTag("user-blogs");
    revalidateTag("featured");
    revalidateTag("latest");
    revalidateTag("trending");
    revalidateTag("blogs");
    revalidatePath("/me/posts");
    return {
      success: true,
      message: `Blog discussion ${show ? "unlocked" : "locked"} successfully`,
    };
  } catch (error) {
    const e = error as Error;
    console.error("Failed to update blog:", e);
    return {
      success: false,
      message: e.message || "An error occurred while updating the blog",
    };
  }
}
