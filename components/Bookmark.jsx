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
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    setIsBookmarked(!!bookmarkedBlogs[blogId]);
  }, [blogId]);

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
    setIsClicked(true);

    updateLocalStorage(blogId, updatedValue);

    toast.success(updatedValue ? "bookmarked" : "bookmark removed");

    setTimeout(() => setIsClicked(false), 300);
  }

  return (
    <>
      {isBookmarked ? (
        <svg
          viewBox="0 0 24 24"
          fill="#22d3ee"
          height={size}
          width={size}
          className={`bookmark-icon fill-cyan-400 hover:scale-110 stroke-cyan-500 ${
            isClicked ? "bookmark-icon-clicked" : ""
          }`}
          onClick={handleClick}>
          <title>remove bookmark</title>
          <path d="M18 22a1 1 0 01-.5-.134L12 18.694l-5.5 3.172A1 1 0 015 21V5a3.003 3.003 0 013-3h8a3.003 3.003 0 013 3v16a1 1 0 01-1 1z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height={size}
          width={size}
          className={`bookmark-icon hover:scale-110 ${
            isClicked ? "bookmark-icon-clicked" : ""
          }`}
          onClick={handleClick}>
          <title>bookmark</title>
          <path d="M16 2H8a3.003 3.003 0 00-3 3v16.5a.5.5 0 00.75.434l6.25-3.6 6.25 3.6A.5.5 0 0019 21.5V5a3.003 3.003 0 00-3-3zm2 18.635l-5.75-3.312a.51.51 0 00-.5 0L6 20.635V5a2.003 2.003 0 012-2h8a2.003 2.003 0 012 2v15.635z" />
        </svg>
      )}
    </>
  );
}
