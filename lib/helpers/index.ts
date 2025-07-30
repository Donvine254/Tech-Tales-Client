import { BlogData } from "@/types";
import { CoverImage } from "@/types";
import { SaveDraftBlog } from "../actions/blogs";
import { toast } from "sonner";

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

// function to generate blog short description when saving
export function generateDescription(body: string): string {
  if (!body) return "";

  const maxLength = 160;
  // Step 1: Remove empty or whitespace-only tags
  let text = body
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/<div>(\s|&nbsp;|<br\s*\/?>)*<\/div>/gi, "");
  // Step 2: Remove all remaining HTML tags
  text = text.replace(/<[^>]*>/g, "");
  // Step 3: Replace common HTML entities manually
  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&rsquo;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&apos;/gi, "'");
  // Step 4: Normalize quotes and whitespace
  text = text
    .replace(/\u00a0/g, " ") // non-breaking space
    .replace(/[“”‘’]/g, '"') // smart quotes to plain quotes
    .replace(/['"]+/g, "") // remove all quotes
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();

  // Step 5: Truncate if necessary
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "... Read More."
    : text;
}
