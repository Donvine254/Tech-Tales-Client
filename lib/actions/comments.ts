"use server";
import { isVerifiedUser } from "@/dal/auth-check";
import prisma from "@/prisma/prisma";
import { CommentData } from "@/types";
import { CommentStatus } from "@prisma/client";
import { redirect } from "next/navigation";

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
  const user = await isVerifiedUser();
  if (!user) {
    redirect("/login");
  }
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

type UpdateCommentInput = {
  id: number;
  body: string;
};

export async function updateComment({
  id,
  body,
}: UpdateCommentInput): Promise<
  | { success: true; comment: CommentData; message: string }
  | { success: false; message: string }
> {
  const user = await isVerifiedUser();
  if (!user) {
    redirect("/login");
  }
  if (!id || !body.trim()) {
    return { success: false, message: "Comment ID and body are required." };
  }

  try {
    const updatedComment = (await prisma.comment.update({
      where: { id },
      data: { body },
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
      comment: updatedComment,
      message: "Comment updated successfully",
    };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { success: false, message: "Failed to update comment." };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteComment(id: number) {
  const user = await isVerifiedUser();
  if (!user) {
    redirect("/login");
  }
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

// function to get user comments
export async function getUserComments(userId: number) {
  if (!userId) {
    redirect("/login");
  }
  try {
    const comments = await prisma.comment.findMany({
      where: { authorId: userId },
      include: {
        blog: {
          select: {
            title: true,
            slug: true,
          },
        },
        _count: {
          select: {
            responses: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
// function to flag a comment
export async function updateCommentStatus(id: number, status: CommentStatus) {
  if (!id || !status) {
    return { success: false, message: "Comment ID and status are required" };
  }
  try {
    await prisma.comment.update({
      where: { id },
      data: { status },
    });
    return { success: true, message: "Comment status updated successfully" };
  } catch (error) {
    console.error("Error updating comment status:", error);
    return { success: false, message: "Failed to update comment status" };
  } finally {
    await prisma.$disconnect();
  }
}
