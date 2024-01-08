"use server";

import { revalidatePath } from "next/cache";

export async function revalidateBlogs(blogId) {
  if (blogId) {
    revalidatePath(`/blogs/${blogId}`, "page");
  } else {
    revalidatePath("/blogs/[blogId]", "layout");
  }
}
export async function revalidatePage(page) {
  revalidatePath(`/${page}`, "page");
}
