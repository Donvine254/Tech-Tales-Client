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
