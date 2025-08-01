"use server";
import prisma from "@/prisma/prisma";

export async function getTopAuthor(userId: number): Promise<boolean> {
  if (!userId) return false;

  try {
    const [top] = (await prisma.blog.groupBy({
      by: ["authorId"],
      _count: {
        authorId: true,
      },
      orderBy: {
        _count: {
          authorId: "desc",
        },
      },
      take: 1,
    })) as Array<{
      authorId: number;
      _count: {
        authorId: number;
      };
    }>;

    return top?.authorId === userId;
  } catch (error) {
    console.error("Error determining top author:", error);
    return false;
  }
}
/*function to track blog reads. This function updates the blog as read only after the user stays on the page for more than 30 seconds */
export async function updateBlogViews(blogId: number) {
  try {
    await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: { views: { increment: 1 } },
      select: {
        id: true,
      },
    });
    console.log("Analytics data sent");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/*function to track user login activity. This function updates the user status as either active or inactive based on whether they are logging in or logging out */
export async function updateUserActivityStatus(
  userId: number,
  status: "ACTIVE" | "INACTIVE"
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        status,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
