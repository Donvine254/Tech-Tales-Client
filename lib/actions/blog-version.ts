"use server";
import prisma from "@/prisma/prisma";
import { getSession } from "./session";
import { formatDate } from "../utils";

/*
 ***This function creates a new blog version entry each time a blog is updated
 */

export async function createBlogVersion(blogId: number, note?: string) {
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, message: "user id is required" };
  }
  try {
    // fetch the blog to know who the author is
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { authorId: true },
    });

    if (!blog) {
      return { success: false, message: "blog not found" };
    }

    // decide role: if current user is the blog author, mark as "author"
    const role =
      blog.authorId === Number(session.userId)
        ? "author"
        : (String(session.role) ?? "user");

    await prisma.blogVersion.create({
      data: {
        blogId,
        editorId: Number(session.userId),
        role,
        note:
          note ??
          `Edited by ${session.username} at ${formatDate(
            new Date(),
            true
          )}. User did not add any comments on what was changed`,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create blog version:", error);
    return { success: false, message: "something went wrong" };
  }
}

/*
 ** Helper function to fetch blog version information
 */
export async function getBlogVersions(blogId: number) {
  try {
    const versions = await prisma.blogVersion.findMany({
      where: {
        blogId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        editor: {
          select: {
            username: true,
            picture: true,
          },
        },
      },
    });

    return versions;
  } catch (error) {
    console.error("Failed to fetch blog versions:", error);
    return [];
  }
}
