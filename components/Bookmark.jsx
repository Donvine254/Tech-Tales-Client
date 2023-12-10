"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Bookmark({ blogId }) {
  const router = useRouter();
  const cookieName = `bookmarked_blog_${blogId}`;

  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the blog is already bookmarked when the component mounts
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});

    setIsBookmarked(cookies[cookieName] === "true");
  }, [cookieName]);
  //function to remove the blog from bookmarks
  function clearCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  function handleClick(e) {
    e.preventDefault();

    const cookieValue = isBookmarked ? "false" : "true";
    const maxAgeInSeconds = 60 * 60 * 24 * 365; // 1 year

    const cookieOptions = {
      path: "/",
      maxAge: maxAgeInSeconds,
    };

    const cookieString = `${cookieName}=${cookieValue}; path=${cookieOptions.path}; max-age=${cookieOptions.maxAge}`;
    document.cookie = cookieString;
    setIsBookmarked(!isBookmarked);
    // If unbookmarking, clear the cookie
    if (!isBookmarked) {
      clearCookie(cookieName);
    }

    toast.success(isBookmarked ? "bookmark removed" : "bookmarked");

    router.refresh();
  }

  return (
    <>
      {isBookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="20"
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
          width="24"
          height="20"
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
