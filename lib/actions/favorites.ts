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
  } finally {
    await prisma.$disconnect();
  }
}
