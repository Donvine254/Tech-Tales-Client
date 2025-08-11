"use server";
import prisma from "@/prisma/prisma";

export async function getFavoriteBlogs(userId: number) {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
    });
    return favorites;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function handleBlogLiking(
  blogId: number,
  userId: number,
  action: "LIKE" | "DISLIKE"
) {
  try {
    if (action === "LIKE") {
      await prisma.blog.update({
        where: { id: blogId },
        data: { likes: { increment: 1 } },
      });

      const favorite = await prisma.favorite.create({
        data: { blogId, userId },
        select: { id: true, userId: true, blogId: true },
      });

      return { success: true, favorite };
    }

    if (action === "DISLIKE") {
      await prisma.blog.update({
        where: { id: blogId },
        data: { likes: { increment: -1 } },
      });

      await prisma.favorite.deleteMany({
        where: { blogId, userId },
      });

      return { success: true, disliked: true };
    }

    return { success: false, message: "Invalid action" };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("Error in handleBlogLiking:", error);
    return {
      success: false,
      message: "An error occurred while updating likes",
      error: error.message,
    };
  }
}
