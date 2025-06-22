"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
// TODO: Modify to check whether the user is logged in or not
// import { useUser } from "@/hooks/use-user";
export default function Bookmark({ blogId }: { blogId: number }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
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
  }, [blogId]);

  const updateLocalStorage = (blogId: number, value: boolean) => {
    const localStorageData = localStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    bookmarkedBlogs[blogId] = value;
    localStorage.setItem("bookmarked_blogs", JSON.stringify(bookmarkedBlogs));
  };

  const handleBookmark = () => {
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
          width="1.25rem"
          height="1.25rem"
          strokeWidth={1.5}
          className="cursor-pointer font-bold hover:text-cyan-600 transition-color"
          onClick={handleBookmark}>
          <title>Add to bookmarks</title>
          <path
            fill="currentColor"
            d="M6 19.5V5.616q0-.691.463-1.153T7.616 4H13v1H7.616q-.231 0-.424.192T7 5.616V17.95l5-2.15l5 2.15V11h1v8.5l-6-2.577zM7 5h6zm10 4V7h-2V6h2V4h1v2h2v1h-2v2z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.25rem"
          height="1.25rem"
          strokeWidth={1.5}
          className="cursor-pointer font-bold hover:text-red-500 transition-color"
          onClick={handleBookmark}>
          <title>Remove from bookmarks</title>
          <path
            fill="oklch(60.9% 0.126 221.723)"
            d="m10.95 13.289l4.239-4.239l-.714-.708l-3.525 3.544l-1.425-1.424l-.713.713zM6 19.5V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616V19.5l-6-2.577z"></path>
        </svg>
      )}
    </>
  );
}
