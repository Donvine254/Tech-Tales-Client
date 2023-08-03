"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Search } from "./Search";
import { SearchMD } from "./SearchMD";
import Link from "next/link";
import { Menu } from "./Menu";
import { usePathname } from "next/navigation";
import Avatar from './Avatar'
import { getCurrentUser } from "@/lib";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const user= getCurrentUser();
 
  return (
    <>
      <div className="p-2 flex w-full m-2 items-center justify-between sticky top-1 dark:bg-slate-900 z-50 bg-gray-200">
        <div className="w-10">
          {!menuOpen ? (
            <FaBars
              className="text-xl md:text-3xl z-50 cursor-pointer transition duration-150 ease-out"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          ) : (
            <Menu
              onClick={() => setMenuOpen(!menuOpen)}
              handleClick={setMenuOpen}
              menuOpen={menuOpen}
            />
          )}
        </div>
        <Link href="/home">
          <h1 className="text-xl md:text-3xl font-bold lg:text-4xl m-auto cursor-pointer">
            Tech Tales
            <span className="text-red-600 text-2xl md:text-5xl">.</span>
          </h1>
        </Link>
        <div className="flex items-center md:gap-1">
          <Search />
          <Link href="/create">
            <button type="button" className="hidden md:block btn-primary">
              Create Post
            </button>
          </Link>
          <Avatar name={user?.username} handleClick={() => setMenuOpen(true)}/>
        </div>
      </div>
      <SearchMD />
      <div className="max-w-7xl mx-auto md:w-2/3">
        <div className="flex justify-center md:justify-start md:ml-5  md:gap-4 items-center">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`navigation ${
                  isActive ? "text-blue-500 font-bold underline bg-slate-300 rounded-lg" : ""
                }`}>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

const navLinks = [
  { name: "Featured", href: "/featured" },
  { name: "Latest", href: "/latest" },
  { name: "For You", href: "/my-blogs" },
];
