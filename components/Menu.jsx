import Link from "next/link";
import React from "react";
import { FaEdit, FaBookOpen } from "react-icons/fa";
import { BsBookmarks } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { TfiClose } from "react-icons/tfi";
import { clearCurrentUser, clearAllCookies } from "@/lib";
import { revalidatePath } from "next/cache";

export const Menu = ({ handleClick, menuOpen }) => {
  function handleSignout() {
    clearCurrentUser();
    clearAllCookies();
    revalidatePath("/my-blogs");
  }
  return (
    <nav className="absolute right-0 md:right-3 top-10 mt-10  md:mt-5 dark:bg-gray-900 shadow-lg bg-slate-100 py-5 text-end rounded-lg md:w-60 w-2/3 z-50 font-poppins">
      <TfiClose
        className="absolute top-1 right-1 rounded-full border p-1 text-2xl mr-2  cursor-pointer"
        onClick={() => handleClick(!menuOpen)}
      />
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
      <Link onClick={handleSignout} href="/login" className="menu-item">
        <GoSignOut />
        Sign Out
      </Link>
    </nav>
  );
};

export default Menu;
