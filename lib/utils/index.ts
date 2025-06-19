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
