"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateBlogs(blogId) {
  if (blogId) {
    revalidatePath(`/blogs/${blogId}`, "page");
  } else {
    revalidatePath("/blogs/[blogId]", "page");
  }
}
export  async function revalidatePage(page) {
    revalidatePath(`/${page}`, "page");

}
