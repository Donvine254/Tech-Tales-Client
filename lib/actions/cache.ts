"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateBlog(blogPath?: string | null) {
  revalidateTag("user-blogs");
  revalidateTag("featured");
  revalidateTag("latest");
  revalidateTag("trending");
  revalidateTag("blogs");
  revalidatePath("/me/posts");
  revalidatePath(`/read/${blogPath}`);
}
