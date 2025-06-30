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

export function calculateReadingTime(blog: string) {
  const textContent = blog.replace(/<\/?[^>]+(>|$)/g, "");
  const words = textContent.trim().split(/\s+/).length;
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

export async function handleSharing(title: string, slug: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${title}`,
        text: "See this interesting blog i found on Techtales!",
        url: `https://techtales.vercel.app/blogs/${slug}`,
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

//function to generate password
export function generatePassword() {
  let pass = "";
  const str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 9; i++) {
    const char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}
