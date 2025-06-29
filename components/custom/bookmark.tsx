"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSession } from "@/providers/session";
export default function Bookmark({ blogId }: { blogId: number }) {
  const { session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    if (!session) {
      return
    }
    const localStorageData = localStorage.getItem("bookmarked_blogs");
    let bookmarkedBlogs: Record<number, boolean> = {};

    if (localStorageData) {
      try {
        bookmarkedBlogs = JSON.parse(localStorageData);
      } catch (error) {
        console.error("Error parsing bookmarked blogs data:", error);
      }
    }
    setIsBookmarked(!!bookmarkedBlogs[blogId]);
  }, [blogId, session]);

  const updateLocalStorage = (blogId: number, value: boolean) => {
    const localStorageData = localStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    bookmarkedBlogs[blogId] = value;
    localStorage.setItem("bookmarked_blogs", JSON.stringify(bookmarkedBlogs));
  };

  const handleBookmark = () => {
    if (!session) {
      toast.info("Login to bookmark blogs")
    }
    const updatedValue = !isBookmarked;
    setIsBookmarked(updatedValue);
    updateLocalStorage(blogId, updatedValue);
    toast.success(updatedValue ? "bookmarked" : "bookmark removed");
  };

  return (
    <>
      {!isBookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.15rem"
          height="1.15rem"
          className="cursor-pointer font-bold hover:text-cyan-600 transition-color"
          onClick={handleBookmark}>
          <title>Add to bookmarks</title>
          <path
            fill="currentColor"
            d="M5 21V5q0-.825.588-1.412T7 3h6v2H7v12.95l5-2.15l5 2.15V11h2v10l-7-3zM7 5h6zm10 4V7h-2V5h2V3h2v2h2v2h-2v2z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.25rem"
          height="1.25rem"
          strokeWidth={1.5}
          className="cursor-pointer  text-cyan-500 hover:text-red-500 transition-color"
          onClick={handleBookmark}>
          <title>Remove from bookmarks</title>
          <path
            fill="currentColor"
            d="m10.95 14l4.95-4.95l-1.425-1.4l-3.525 3.525L9.525 9.75L8.1 11.175zM5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
        </svg>
      )}
    </>
  );
}
