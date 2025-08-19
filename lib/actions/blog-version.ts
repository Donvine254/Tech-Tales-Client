"use server";
import prisma from "@/prisma/prisma";
import { getSession } from "./session";

/*
 ***This function creates a new blog version entry each time a blog is updated
 */

export async function createBlogVersion(blogId: number, note?: string) {
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, message: "user id is required" };
  }
  try {
    await prisma.blogVersion.create({
      data: {
        blogId,
        editorId: Number(session.userId),
        role: String(session.role) ?? "author",
        note:
          note ??
          `Edited by ${session.username} at ${new Date().toISOString()}. User did not add any comments on what was changed`,
      },
    });
  } catch (error) {
    console.error("Failed to create blog version:", error);
  }
}
