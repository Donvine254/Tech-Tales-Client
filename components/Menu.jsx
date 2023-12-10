import Link from "next/link";
import React from "react";
import { FaBookOpen, FaUser } from "react-icons/fa";
import { Edit } from "@/assets";
import { BsBookmarks, BsFillGearFill } from "react-icons/bs";
import { clearCurrentUser, clearAllCookies } from "@/lib";
import { revalidatePath } from "next/cache";

export const Menu = ({ handleClick, menuOpen, currentUser }) => {
  function handleSignout() {
    clearCurrentUser();
    clearAllCookies();

    revalidatePath("/my-blogs");
  }
  return (
    <div className="space-y-4 bg-slate-100 border-2 shadow-lg z-50 py-5 px-2 md:px-4 rounded-lg min-w-[250px] w-fit font-poppins">
      <Link
        href="/featured"
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
          <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
          <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
          <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
        </svg>
        Featured Stories
      </Link>
      <Link
        href="/latest"
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        Trending Stories
      </Link>
      <Link
        href="/create"
        className=" menu-item"
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
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" x2="2" y1="8" y2="22" />
          <line x1="17.5" x2="9" y1="15" y2="15" />
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
        href="/settings"
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
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        My Profile
      </Link>
      <Link
        href="/settings"
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
          <line x1="21" x2="14" y1="4" y2="4" />
          <line x1="10" x2="3" y1="4" y2="4" />
          <line x1="21" x2="12" y1="12" y2="12" />
          <line x1="8" x2="3" y1="12" y2="12" />
          <line x1="21" x2="16" y1="20" y2="20" />
          <line x1="12" x2="3" y1="20" y2="20" />
          <line x1="14" x2="14" y1="2" y2="6" />
          <line x1="8" x2="8" y1="10" y2="14" />
          <line x1="16" x2="16" y1="18" y2="22" />
        </svg>
        Settings
      </Link>
      <Link href="/">
        <button
          onClick={handleSignout}
          className="w-full mt-2 py-2 text-xl gap-2 px-3 font-bold border  bg-slate-100 rounded-md hover:bg-gray-200  shadow-md">
          Sign Out
        </button>
      </Link>

      <p classNAme="text-gray-400 text-center">{currentUser?.email}</p>
    </div>
  );
};

export default Menu;
