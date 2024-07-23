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
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  }
}
export async function updateUserStatus(id) {
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "SUSPENDED",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
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
  }
}
