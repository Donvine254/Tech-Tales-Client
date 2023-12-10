"use client";
import React, { useState } from "react";
import { Search } from "./Search";
import { SearchMD } from "./SearchMD";
import Link from "next/link";
import { Menu } from "./Menu";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib";
import Image from "next/image";
import { SortUp, SortDown } from "@/assets";

const user = getCurrentUser();

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <nav className="w-full">
      <div
        className="p-4 md:p-5 bg-[#f4f3f2] flex w-full items-center justify-between relative top-0 z-50 flex-wrap mb-2"
        id="parent div">
        <Link href="/">
          <h1 className="text-xl md:text-3xl font-bold lg:text-4xl m-auto cursor-pointer">
            Tech Tales
            <span className="text-red-600 text-2xl md:text-5xl">.</span>
          </h1>
        </Link>
        <Search />
        <div
          className={`flex items-center md:gap-1 mr-2 ${!user ? "hidden" : ""}`}
          id="user present">
          <Link
            href="/create"
            className="hidden md:block hover:text-white btn-primary cursor-pointer">
            Create Post
          </Link>
          <div className="flex items-center gap-1">
            {user ? (
              <Image
                className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
                src={user.picture}
                width={48}
                height={48}
                onClick={() => setMenuOpen(true)}
                alt="user profile avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
            )}
            {menuOpen ? (
              <SortUp handleClick={() => setMenuOpen(!menuOpen)} />
            ) : (
              <SortDown handleClick={() => setMenuOpen(!menuOpen)} />
            )}
          </div>
        </div>
        {/* only show login button when the user is not logged in */}
        <Link
          href="/login"
          className={`btn-primary text-xl cursor-pointer hover:text-white ${
            user ? "hidden" : ""
          }`}>
          Login
        </Link>
      </div>
      <SearchMD />
      <div className="flex justify-center items-center" id="bottom nav">
        <div className="flex justify-center md:justify-start md:ml-5  md:gap-4 md:text-2xl items-center font-crimson">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`navigation ${
                  isActive
                    ? "text-blue-500 font-bold underline bg-slate-300 rounded-lg"
                    : ""
                }`}>
                {link.name}
              </Link>
            );
          })}
        </div>
        {menuOpen ? (
          <Menu
            onClick={() => setMenuOpen(!menuOpen)}
            handleClick={setMenuOpen}
            menuOpen={menuOpen}
            currentUser={user}
          />
        ) : null}
      </div>
    </nav>
  );
}

const navLinks = [
  { name: "Featured", href: "/featured" },
  { name: "Latest", href: "/latest" },
  { name: "For You", href: "/my-blogs" },
];
