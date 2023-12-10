import Link from "next/link";
import React from "react";
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
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>
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
      <Link href="/" onClick={handleSignout}>
        <button className="w-full mt-2 py-2 text-xl gap-2 px-3 font-bold border  bg-slate-100 rounded-md hover:bg-gray-200  shadow-md">
          Sign Out
        </button>
      </Link>

      <p classNAme="text-gray-400 text-center">{currentUser?.email}</p>
    </div>
  );
};

export default Menu;
