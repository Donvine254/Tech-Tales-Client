'use client'
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

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

    const cookieValue = isBookmarked ? "false" : "true"; 
    const maxAgeInSeconds = 60 * 60 * 24 * 365; // 1 year

    const cookieOptions = {
      path: "/",
      maxAge: maxAgeInSeconds,
    };

    const cookieString = `${cookieName}=${cookieValue}; path=${cookieOptions.path}; max-age=${cookieOptions.maxAge}`;
    document.cookie = cookieString;
    setIsBookmarked(!isBookmarked);
    Swal.fire({
        title: "Bookmarked ✅",
        showConfirmButton: false,
        timer: 500,
      });
    router.refresh();
  }

  return (
    <>
      {isBookmarked ? (
        <p className="xsm:text-base">&#x2713; Bookmarked</p>
      ) : (
        <MdOutlineBookmarkAdd
          className="md:text-xl cursor-pointer hover:scale-125"
          onClick={handleClick}
        />
      )}
    </>
  );
}
