import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://techtales.vercel.app";
export const DELETED_USER_ID = 49;

export function calculateReadingTime(blog: string) {
  // Step 1: Remove empty or whitespace-only tags
  let text = blog
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
  text = text
    .replace(/\u00a0/g, " ")
    .replace(/[“”‘’]/g, '"')
    .replace(/['"]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 265);
  return readingTime;
}

export function formatViews(views: number) {
  if (views < 1000) {
    return views.toString();
  } else if (views >= 1000 && views < 1000000) {
    const formattedViews = (views / 1000).toFixed(views % 1000 === 0 ? 0 : 1);
    return `${formattedViews}K`;
  } else if (views >= 500000) {
    const formattedViews = (views / 1000000).toFixed(1);
    return `${formattedViews}M`;
  } else if (views >= 1000000) {
    const formattedViews = (views / 1000000).toFixed(
      views % 1000000 === 0 ? 0 : 1
    );
    return `${formattedViews}M`;
  }
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function handleSharing(title: string, path: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${title}`,
        text: "See this interesting blog i found on Techtales!",
        url: `https://techtales.vercel.app/read/${path}`,
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error sharing content:", error);
    }
  } else {
    toast.error("Web Share API not supported in this browser.");
  }
}

export const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function slugify(blogTitle: string) {
  return blogTitle
    .toLowerCase()
    .replace(/[^\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
// function to create  blog path
export function createBlogPath(handle: string, slug: string): string {
  if (!handle || !slug) {
    throw new Error(
      "Both handle and slug are required to generate a blog path."
    );
  }
  return `${handle}/${slug}`;
}
export function generatePassword(length = 12): string {
  const minLength = 8;
  const finalLength = Math.max(length, minLength);
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "@#$&?!.,:;=+-*|~^{}[]()";
  const all = uppercase + lowercase + digits + special;
  const getRandomChar = (charset: string) =>
    charset[crypto.getRandomValues(new Uint32Array(1))[0] % charset.length];
  const passwordChars = [
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(digits),
    getRandomChar(special),
  ];
  while (passwordChars.length < finalLength) {
    passwordChars.push(getRandomChar(all));
  }
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }
  return passwordChars.join("");
}

// function to convert to handle
export function convertToHandle(name: string) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export const formatCommentDate = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};
