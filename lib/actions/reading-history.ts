"use server";
import { isVerifiedUser } from "@/dal/auth-check";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";

export async function fetchHistoryBlogs() {
  const user = await isVerifiedUser();
  if (!user?.userId) return [];

  try {
    const history = await prisma.readHistory.findMany({
      where: { userId: user.userId },
      orderBy: { updatedAt: "desc" },
      select: {
        blog: {
          select: {
            status: true,
            ...blogSelect,
          },
        },
      },
    });
    return history.map((h) => {
      // biome-ignore lint/suspicious/noExplicitAny: Prisma relation type inference issue
      return (h as any).blog;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// function to clear all user reading history
export async function clearReadHistory({
  blogId,
  deleteAll = false,
}: {
  blogId?: number;
  deleteAll?: boolean;
}) {
  const user = await isVerifiedUser();
  if (!user?.userId) return false;
  // prevent accidental deletion — must explicitly pass deleteAll or a blogId
  if (!deleteAll && !blogId) return false;
  try {
    await prisma.readHistory.deleteMany({
      where: {
        userId: user.userId,
        ...(deleteAll ? {} : { blogId }),
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
