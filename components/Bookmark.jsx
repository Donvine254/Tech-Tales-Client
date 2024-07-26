"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "@/providers";
import secureLocalStorage from "react-secure-storage";

export default function Bookmark({ blogId, size = 24 }) {
  const user = useUserContext();
  const router = useRouter();

  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the blog is already bookmarked when the component mounts
  useEffect(() => {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    setIsBookmarked(!!bookmarkedBlogs[blogId]);
  }, [blogId]);

  // Function to update local storage with the bookmarked blogs
  const updateLocalStorage = (blogId, value) => {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    bookmarkedBlogs[blogId] = value;
    secureLocalStorage.setItem(
      "bookmarked_blogs",
      JSON.stringify(bookmarkedBlogs)
    );
  };

  function handleClick(e) {
    e.preventDefault();
    if (!user) {
      toast.error("Login required");
      router.push("/login");
      return false;
    }
    const updatedValue = !isBookmarked;
    setIsBookmarked(updatedValue);

    // Update local storage with the bookmarked blogs
    updateLocalStorage(blogId, updatedValue);

    toast.success(updatedValue ? "bookmarked" : "bookmark removed");
  }

  return (
    <>
      {isBookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          title="bookmark"
          onClick={handleClick}
          className="md:text-xl cursor-pointer hover:scale-125 font-bold text-green-600">
          <title>remove bookmark</title>
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
          <path d="m9 10 2 2 4-4" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          title="bookmark"
          className="md:text-xl cursor-pointer hover:scale-125"
          onClick={handleClick}>
          <title>bookmark</title>
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          <line x1="12" x2="12" y1="7" y2="13" />
          <line x1="15" x2="9" y1="10" y2="10" />
        </svg>
      )}
    </>
  );
}
