"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Search } from "./Search";
import Link from "next/link";
import { Menu } from "./Menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="p-2 flex w-full m-2 items-center justify-between relative">
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
            Tech Tales{" "}
            <span className="text-red-600 text-2xl md:text-5xl">.</span>
          </h1>
        </Link>
        <div className="flex items-center md:gap-1">
          <Search/>
          <Link href="/create">
            <button type="button" className="hidden md:block btn-primary">
              Create Post
            </button>
          </Link>
          <img
            src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
            className="avatar md:mr-5"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto md:w-2/3">
        <div className="flex justify-center md:justify-start md:ml-5  md:gap-4 items-center">
          <Link href="blogs/featured" className="navigation">
            Featured
          </Link>
          <Link href="blogs/latest" className="navigation">
            Latest
          </Link>
          <Link href="/blogs/user" className="navigation">
            For You
          </Link>
        </div>
      </div>
    </>
  );
}
