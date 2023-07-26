
import Link from "next/link";
import React from "react";
import { FaEdit, FaBookOpen } from "react-icons/fa";
import { BsBookmarks } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { clearCurrentUser, getCurrentUser } from "@/lib";
import { revalidatePath } from 'next/cache'

export const Menu = ({ handleClick, menuOpen }) => {
  
  const user = getCurrentUser();
  function handleSignout() {
    clearCurrentUser();
    revalidatePath("/my-blogs")
  }
  return (
    <nav className="absolute left-0 top-1 space-y-10 md:mt-5 dark:bg-gray-900 shadow-lg bg-slate-100 py-4 rounded-lg md:w-60 w-2/3 z-50 h-screen">
      <h1
        className="absolute top-0 right-0 text-4xl mr-2 hover:scale-125 ease-in-out cursor-pointer"
        onClick={() => handleClick(!menuOpen)}>
        x
      </h1>
      <h1 className="md:hidden text-2xl font-bold p-3">
        Tech Tales <span className="text-red-600 text-5xl">.</span>
      </h1>

      <Link
        href="/create"
        className=" menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <FaEdit />
        Create Blog
      </Link>
      <Link
        href="/my-blogs"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <BsBookmarks />
        Library
      </Link>
      <Link
        href="/featured"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <FaBookOpen />
        Stories
      </Link>
      <Link  onClick={handleSignout} href="/login" className="menu-item">
        <GoSignOut />
        Sign Out
      </Link>
      <div className="hidden md:block px-3 py-2 mt-0">
        <p className="font-bold">
          <span className="font-xl">Tech Tales</span> Is a community of over
          1000 amazing tech students passionate about technology
        </p>
        <p className="text-sm text-gray-200 py-2">
          We are a place where coders share, stay up-to-date and grow their
          careers.
        </p>
      </div>
    </nav>
  );
};

export default Menu;
