import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
