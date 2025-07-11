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
    blog.tags.split(",").length === 4
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
