import { BlogData } from "@/types";

export function emptyBlogData(): BlogData {
  return {
    title: null,
    body: null,
    slug: null,
    tags: null,
    image: {
      secure_url: "",
      public_id: "",
    },
    audio: null,
  };
}

// helper function for publishing
import { CoverImage } from "@/types";
import { SaveDraftBlog } from "../actions/blogs";
import { toast } from "sonner";

interface BlogFields {
  title?: string | null;
  body?: string | null;
  slug?: string | null;
  tags?: string | null;
  image?: unknown;
}

export function canPublishBlog(blog: BlogFields): {
  valid: boolean;
  message?: string;
} {
  if (!blog.title?.trim()) {
    return { valid: false, message: "Title is required." };
  }

  if (!blog.body?.trim() || blog.body?.length < 300) {
    return {
      valid: false,
      message: "Body must be at least 300 characters long.",
    };
  }
  if (!blog.slug?.trim()) {
    return { valid: false, message: "Slug is required." };
  }
  if (
    blog.tags == null ||
    blog.tags.trim() === "" ||
    blog.tags.split(",").length < 4
  ) {
    return { valid: false, message: "At least four tags are required." };
  }
  const image = blog.image as CoverImage | undefined;
  if (
    !image ||
    typeof image !== "object" ||
    !image?.secure_url?.trim() ||
    !image.public_id?.trim()
  ) {
    return { valid: false, message: "A valid cover image is required." };
  }

  return { valid: true, message: "Blog fields are valid" };
}

//check if the form has entries
export const hasEntries = (data: BlogData) => {
  return (
    data.title?.trim() !== "" ||
    data.body?.trim() !== "" ||
    data.tags?.trim() !== "" ||
    data.image?.secure_url?.trim() !== ""
  );
};
//check if all entries are there
export const hasAllEntries = (data: BlogData): boolean => {
  return (
    data.title?.trim() !== "" &&
    data.body?.trim() !== "" &&
    data.tags?.trim() !== "" &&
    data.image?.secure_url?.trim() !== ""
  );
};

// function to sync draft
export async function SaveDraft(data: BlogData, uuid: string) {
  const toastId = toast.loading("Processing request");
  const res = await SaveDraftBlog(data, uuid);
  toast.dismiss(toastId);
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
}
