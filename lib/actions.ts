"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function revalidateBlogs(slug: string) {
  if (slug) {
    revalidatePath(`/blogs/${slug}`, "page");
  } else {
    revalidatePath("/blogs/[slug]", "layout");
  }
}
export async function revalidatePage(page) {
  revalidatePath(`/${page}`, "page");
}
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export async function resetPassword(userData: {
  email: string;
  password: string;
}) {
  const { email, password } = userData;
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: await hashPassword(password),
      },
    });
    return { message: "Password updated successfully!" };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function updateUserRole(id: string | number, role: string) {
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

export async function updateUserStatus(id: number | string, status: string) {
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

export async function deleteUser(id: number | string) {
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

export async function updateCommentStatus(status: string, id: number | string) {
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
export async function getBlogData(slug: string) {
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

export async function handleBlogLiking(
  id: number | string,
  userId: number | string,
  action: string
) {
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
      const favorite = await prisma.favorite.create({
        data: { blogId: id, userId: userId },
        select: { id: true, userId: true, blogId: id },
      });
      return favorite;
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
      await prisma.favorite.deleteMany({
        where: {
          blogId: Number(id),
          userId: Number(userId),
        },
      });
      return { disliked: true };
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// added here since imports are bringing errors
type patchData = {
  title?: string;
  body?: string;
  slug?: string;
  image?: string;
  tags?: string;
  status?: string;
  likes?: number;
  views?: number;
};

export async function UpdateBlogData(id: number, data: patchData) {
  if (!id) {
    throw new Error("Record to update not found!");
  }
  try {
    const { title, slug, body, image, tags, status, likes, views } = data;
    const blog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        slug,
        body,
        image,
        tags,
        status,
        likes,
        views,
      },
      select: {
        id: true,
      },
    });
    return { message: "Blog updated successfully" };
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      throw new Error(
        "A blog with similar title exists, kindly choose a different title!"
      );
    } else throw new Error("An error occurred while creating the blog.");
  } finally {
    await prisma.$disconnect();
  }
}

const allowedStatuses = ["PUBLISHED", "ARCHIVED", "UNPUBLISHED"];

export async function UpdateBlogStatus(id: number, status: string) {
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status provided!");
  }

  try {
    const blog = await prisma.blog.update({
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
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the blog status.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function DeleteBlog(id: number) {
  try {
    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
    return { success: "Blog has been deleted successfully" };
  } catch (error) {
    throw new Error(error);
  }
}

export async function CheckFavoriteStatus(userId: number, blogId: number) {
  try {
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: userId,
        blogId: blogId,
      },
    });
    if (favorite) return true;
    else return false;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
