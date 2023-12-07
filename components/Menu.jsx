import Link from "next/link";
import React from "react";
import { FaEdit, FaBookOpen, FaUser } from "react-icons/fa";
import { BsBookmarks, BsFillGearFill } from "react-icons/bs";
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
    <nav className="absolute right-0 top-20 md:mt-5 md:right-14 lg:right-20  space-y-4 bg-slate-100 shadow-lg z-50 py-5 px-8 rounded-lg w-fit font-poppins">
      <TfiClose
        className="absolute top-1 right-1 rounded-full border p-1 text-2xl mr-2  cursor-pointer bg-slate-200"
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
      <Link
        href="/settings"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <FaUser />
        My Profile
      </Link>
      <Link
        href="/settings"
        className="menu-item"
        onClick={() => handleClick(!menuOpen)}>
        <BsFillGearFill />
        Settings
      </Link>
      <Link
        onClick={handleSignout}
        href="/"
        className="menu-item border hover:border-none bg-slate-100 rounded-md hover:bg-red-600  shadow-md">
        <GoSignOut />
        Sign Out
      </Link>
    </nav>
  );
};

export default Menu;
