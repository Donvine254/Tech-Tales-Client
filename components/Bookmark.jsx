'use client'
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

  function handleClick(e) {
    e.preventDefault();

    const cookieValue = isBookmarked ? "false" : "true"; // Toggle bookmark status
    const maxAgeInSeconds = 60 * 60 * 24 * 365; // 1 year

    const cookieOptions = {
      path: "/",
      maxAge: maxAgeInSeconds,
    };

    const cookieString = `${cookieName}=${cookieValue}; path=${cookieOptions.path}; max-age=${cookieOptions.maxAge}`;
    document.cookie = cookieString;
    setIsBookmarked(!isBookmarked);
    router.refresh();
  }

  return (
    <>
      {isBookmarked ? (
        <p className="xsm:text-base md:text-xl">&#x2713; Bookmarked</p>
      ) : (
        <MdOutlineBookmarkAdd
          className="md:text-xl cursor-pointer hover:scale-125"
          onClick={handleClick}
        />
      )}
    </>
  );
}
