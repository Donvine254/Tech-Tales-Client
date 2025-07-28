"use server";
import prisma from "@/prisma/prisma";
import { ResponseData } from "@/types";

type responseBody = {
  authorId: number;
  commentId: number;
  body: string;
};
export async function createResponse(
  data: responseBody
): Promise<
  | { success: true; response: ResponseData; message: string }
  | { success: false; message: string }
> {
  if (!data.body || !data.authorId || !data.commentId) {
    return { success: false, message: "All entries are required" };
  }
  try {
    const newResponse = (await prisma.response.create({
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
      },
    })) as ResponseData;

    return {
      success: true,
      message: "response added successfully",
      response: newResponse,
    };
  } catch (error) {
    console.error("Failed to create response:", error);
    return { success: false, message: "Failed to create response." };
  } finally {
    await prisma.$disconnect();
  }
}

type UpdateResponseInput = {
  id: number;
  body: string;
};

export async function updateResponse({
  id,
  body,
}: UpdateResponseInput): Promise<
  | { success: true; response: ResponseData; message: string }
  | { success: false; message: string }
> {
  if (!id || !body.trim()) {
    return { success: false, message: "Comment ID and body are required." };
  }

  try {
    // First, update the comment
    const updatedResponse = (await prisma.response.update({
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
      },
    })) as ResponseData;
    return {
      success: true,
      response: updatedResponse,
      message: "Response updated successfully",
    };
  } catch (error) {
    console.error("Error updating response:", error);
    return { success: false, message: "Failed to update response." };
  } finally {
    await prisma.$disconnect();
  }
}

// function to delete responses
export async function deleteResponse(id: number) {
  if (!id) {
    return { success: false, message: "response ID is required." };
  }
  try {
    await prisma.response.delete({
      where: { id },
    });
    return { success: true, message: "Response deleted successfully." };
  } catch (error) {
    console.error("Failed to delete response:", error);
    return { success: false, message: "Failed to delete response." };
  } finally {
    await prisma.$disconnect();
  }
}
