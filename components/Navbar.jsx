"use client";
import React, { useState } from "react";
import { Search } from "./Search";
import { SearchMD } from "./SearchMD";
import Link from "next/link";
import { Menu } from "./Menu";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { getCurrentUser } from "@/lib";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const user = getCurrentUser();

  return (
    <section className="sticky top-1">
      <div className="p-2 flex w-full m-2 items-center justify-between relative dark:bg-slate-900 z-[20] bg-gray-200 ">
        <div id="logo">
          <Link href="/">
            <h1 className="text-xl md:text-3xl font-bold lg:text-4xl m-auto cursor-pointer">
              Tech Tales
              <span className="text-red-600 text-2xl md:text-5xl">.</span>
            </h1>
          </Link>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
        {user ? (
          <div className="flex items-center md:gap-1 mr-2">
            <Link href="/create">
              <button type="button" className="hidden md:block btn-primary">
                Create Post
              </button>
            </Link>
            <Avatar
              name={user?.username}
              handleClick={() => setMenuOpen(true)}
            />
          </div>
        ) : (
          <Link href="/login">
            <button type="button" className="btn-primary text-xl">
              Login
            </button>
          </Link>
        )}
      </div>
      <SearchMD />
      <div className="max-w-7xl mx-auto md:w-2/3">
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
          />
        ) : null}
      </div>
    </section>
  );
}

const navLinks = [
  { name: "Featured", href: "/featured" },
  { name: "Latest", href: "/latest" },
  { name: "For You", href: "/my-blogs" },
];
