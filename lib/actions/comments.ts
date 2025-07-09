"use server";
import prisma from "@/prisma/prisma";
import { CommentData } from "@/types";

type CommentBody = {
  authorId: number;
  blogId: number;
  body: string;
};
export async function createComment(
  data: CommentBody
): Promise<
  | { success: true; comment: CommentData; message: string }
  | { success: false; message: string }
> {
  if (!data.body || !data.authorId || !data.blogId) {
    return { success: false, message: "All entries are required" };
  }
  try {
    const newComment = (await prisma.comment.create({
      data,
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            role: true,
            status: true,
          },
        },
        responses: true,
      },
    })) as CommentData;

    return {
      success: true,
      message: "comment added successfully",
      comment: newComment,
    };
  } catch (error) {
    console.error("Failed to create comment:", error);
    return { success: false, message: "Failed to create comment." };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteComment(id: number) {
  if (!id) {
    return { success: false, message: "Comment ID is required." };
  }

  try {
    await prisma.comment.delete({
      where: { id },
    });

    return { success: true, message: "Comment deleted successfully." };
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return { success: false, message: "Failed to delete comment." };
  } finally {
    await prisma.$disconnect();
  }
}
