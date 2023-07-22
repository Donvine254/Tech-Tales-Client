import Link from "next/link";
import React from "react";
import { FaEdit, FaBookOpen } from "react-icons/fa";
import { BsBookmarks } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";

export const Menu = ({ handleClick, menuOpen }) => {
  return (
    <nav className="absolute left-0 top-1 space-y-10 mt-3 md:mt-5 dark:bg-gray-900 shadow-lg bg-slate-100 py-4 rounded-lg md:w-60 w-2/3 z-50">
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
      <Link href="/login" className="menu-item">
        <GoSignOut />
        Sign Out
      </Link>
    </nav>
  );
};

export default Menu;
