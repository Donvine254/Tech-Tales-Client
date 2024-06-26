import Link from "next/link";
import React from "react";
import { revalidatePage } from "@/lib/actions";
import { clearLocalStorage } from "@/lib";
import toast from "react-hot-toast";
export const Menu = ({ handleClick, menuOpen, currentUser }) => {
  function handleSignout() {
    clearLocalStorage();
    toast.success("logged out successfully");
    revalidatePage("/my-blogs");
    if (typeof window !== undefined) {
      window.location.reload();
    }
  }
  return (
    <div className="space-y-4 bg-slate-100 border-2 shadow-lg z-50 py-5 px-2 md:px-4 rounded-lg  min-w-[250px] md:min-w-[300px]  font-poppins">
      <Link
        href="/featured"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <svg viewBox="0 0 384 512" fill="currentColor" height="24" width="24">
          <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7l19.3 9.7c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7l-9.7 19.3c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2.8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1.4 14.2-1.5 20.1-5.4l17.9-11.7zM272 192c0-44.2-35.8-80-80-80s-80 35.8-80 80 35.8 80 80 80 80-35.8 80-80zM1.3 441.8l43.1-102.5c.2.1.3.2.4.4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7.2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2l-32.2-49.3-56.1 8.3c-5.7.8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1.4-.2.7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2.2-.3.4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
        </svg>
        Featured Stories
      </Link>
      <Link
        href="/latest"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <svg viewBox="0 0 448 512" fill="currentColor" height="24" width="24">
          <path d="M414.9 161.5C340.2 29 121.1 0 121.1 0S222.2 110.4 93 197.7C11.3 252.8-21 324.4 14 402.6c26.8 59.9 83.5 84.3 144.6 93.4-29.2-55.1-6.6-122.4-4.1-129.6 57.1 86.4 165 0 110.8-93.9 71 15.4 81.6 138.6 27.1 215.5 80.5-25.3 134.1-88.9 148.8-145.6 15.5-59.3 3.7-127.9-26.3-180.9z" />
        </svg>
        Trending Stories
      </Link>
      <Link
        href="/create"
        className=" menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <svg viewBox="0 0 693 1000" fill="currentColor" height="24" width="24">
          <path d="M55 988c-4 13.333-12.667 16-26 8-12-5.333-17.333-16.667-16-34 2.667-66.667 19.333-142 50-226-66.667-102.667-84-208-52-316 6.667 21.333 17.333 47.333 32 78 14.667 30.667 29.333 57.333 44 80 14.667 22.667 25.333 32.667 32 30 5.333-2.667 5.333-30.333 0-83s-9-108-11-166 6.333-110.333 25-157c14.667-29.333 41.333-60.667 80-94s73.333-56.667 104-70c-16 30.667-27 62-33 94s-7.333 58-4 78 10.333 30.667 21 32c8 0 36-40 84-120S468.333 1.333 491 0c30.667-2.667 68.667 7 114 29s72.667 43.667 82 65c8 16 8 42.333 0 79s-21.333 64.333-40 83c-29.333 29.333-78 50-146 62s-106 20-114 24c-10.667 6.667-6.667 18 12 34 36 32 94.667 38.667 176 20-37.333 53.333-82.667 91.333-136 114s-97.333 35.333-132 38c-34.667 2.667-52.667 6-54 10-2.667 16 13.667 34 49 54s69 24.667 101 14c-20 37.333-41 65.333-63 84s-40 30.333-54 35c-14 4.667-39.333 8.333-76 11s-65 5.333-85 8L55 988" />
        </svg>
        Create Blog
      </Link>
      <Link
        href="/my-blogs"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        My Blogs
      </Link>

      <Link
        href="/me"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <svg fill="none" viewBox="0 0 24 24" height="24" width="24">
          <path
            fill="currentColor"
            d="M15 4h6v6h-6V4zM3 12a9 9 0 1018 0h-4a5 5 0 01-10 0H3zM6 10a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
        My Profile
      </Link>
      <Link
        href="/me/settings"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          height="24"
          width="24">
          <path d="M20 7h-9M14 17H5" />
          <path d="M20 17 A3 3 0 0 1 17 20 A3 3 0 0 1 14 17 A3 3 0 0 1 20 17 z" />
          <path d="M10 7 A3 3 0 0 1 7 10 A3 3 0 0 1 4 7 A3 3 0 0 1 10 7 z" />
        </svg>
        Settings
      </Link>
      <button
        onClick={handleSignout}
        className="w-full mt-2 py-2 text-start px-3 border  rounded-md  hover:border-red-500  shadow-md">
        <span className="font-bold">Sign Out</span>
        <p className="text-gray-800 text-[12px] md:text-base line-clamp-through">
          {currentUser?.email}
        </p>
      </button>
    </div>
  );
};

export default Menu;
