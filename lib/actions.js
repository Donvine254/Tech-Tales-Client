"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function revalidateBlogs(slug) {
  if (slug) {
    revalidatePath(`/blogs/${slug}`, "page");
  } else {
    revalidatePath("/blogs/[slug]", "layout");
  }
}
export async function revalidatePage(page) {
  revalidatePath(`/${page}`, "page");
}

export async function updateUserRole(id, role) {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        picture: true,
        handle: true,
        bio: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function deactivateUser(id) {
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "DEACTIVATED",
        deactivatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserStatus(id, status) {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        picture: true,
        handle: true,
        bio: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUser(id) {
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCommentStatus(status, id) {
  try {
    const comment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            role: true,
          },
        },
        blog: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating comment status", error);
  } finally {
    await prisma.$disconnect();
  }
}

//function to get slug blog
export async function getBlogData(slug) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        tags: true,
        image: true,
        body: true,
        authorId: true,
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function handleBlogLiking(id, action) {
  try {
    // Get the current likes count
    if (action === "LIKE") {
      await prisma.blog.update({
        where: {
          id: Number(id),
        },
        data: { likes: { increment: 1 } },
        select: {
          id: true,
        },
      });
      return { liked: true };
    } else if (action === "DISLIKE") {
      await prisma.blog.update({
        where: {
          id: Number(id),
        },
        data: { likes: { increment: -1 } },
        select: {
          id: true,
        },
      });
      return { disliked: true };
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
