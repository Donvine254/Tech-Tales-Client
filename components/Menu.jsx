import Link from "next/link";
import React from "react";
import { FaEdit, FaBookOpen, FaUser } from "react-icons/fa";
import { BsBookmarks, BsFillGearFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { TfiClose } from "react-icons/tfi";
import { clearCurrentUser, clearAllCookies } from "@/lib";
import { revalidatePath } from "next/cache";

export const Menu = ({ handleClick, menuOpen, currentUser }) => {
  function handleSignout() {
    clearCurrentUser();
    clearAllCookies();
    revalidatePath("/my-blogs");
  }
  return (
    <div className="absolute right-0 top-20 md:mt-5 md:right-14 lg:right-20  space-y-4 bg-slate-100 shadow-lg z-50 py-5 px-8 rounded-lg min-w-[200px] w-fit font-poppins">
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
        className="flex items-center justify-between md:text-2xl gap-2 px-3 py-2 font-bold border  bg-slate-100 rounded-md hover:bg-gray-200  shadow-md">
        <GoSignOut />
        Sign Out
      </Link>
      <p classNAme="text-gray-600 py-2">{currentUser?.email}</p>
    </div>
  );
};

export default Menu;
