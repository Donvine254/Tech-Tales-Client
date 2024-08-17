"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "./Search";
import { Menu } from "./Menu";
import Popup from "./alerts/LoginAlert";
import { SortUp, SortDown } from "@/assets";
import { useUserContext } from "@/providers";
import { Tooltip } from "react-tooltip";
export const dynamic = "force-dynamic";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const user = useUserContext();

  const pathname = usePathname().replace(/^\/+/, "") ?? "relevant";
  return (
    <nav className="w-full font-crimson h-20 md:h-16 lg:h-10">
      <div
        className="p-4 md:px-4 md:py-0 lg:px-4 lg:py-0 bg-[#f4f3f2]  flex w-full items-center justify-between fixed top-0 z-20 flex-wrap mb-2 border-b-2"
        id="parent div">
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-semibold lg:text-3xl m-auto cursor-pointer font-roboto">
            TECH
            <span className="text-white bg-cyan-500 px-0.5 rounded-md">
              TALES
              <span className="text-red-600 text-3xl md:text-5xl">.</span>
            </span>
          </h1>
        </Link>

        <Search />

        <div
          className={`flex items-center md:gap-1 lg:gap-2 mr-2 ${
            !user ? "hidden" : ""
          }`}
          id="user present">
          <Link
            href="/create"
            className="hidden md:block py-2 mx-1 px-4 border border-blue-500 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-cyan-500 hover:to-green-400 rounded-md text-xl cursor-pointer hover:text-white shadow-md "
            data-tooltip-id="create-post">
            <Tooltip
              id="create-post"
              place="bottom"
              content="Write your own blog post!"
              variant="info"
              style={{ padding: "2px", fontSize: "12px" }}
            />
            Create Post
          </Link>
          <div className="flex items-center gap-1 relative">
            {user && (
              <>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  height="24"
                  width="24"
                  data-tooltip-id="notifications"
                  className="fill-gray-400 hover:bg-gray-300 hover:fill-blue-500 rounded-full p-1 mx-2">
                  <path d="M4 8a6 6 0 014.03-5.67 2 2 0 113.95 0A6 6 0 0116 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 11-4 0h4z" />
                </svg>
                <Tooltip
                  id="notifications"
                  place="bottom"
                  content="You have no new notifications"
                  variant="info"
                  style={{ padding: "2px", fontSize: "12px" }}
                />
                <Image
                  className="h-10 w-10 rounded-full cursor-pointer italic ring ring-blue-400 ring-offset-1 ring-offset-white"
                  src={user.picture}
                  width={40}
                  height={40}
                  onClick={() => setMenuOpen(!menuOpen)}
                  alt="user profile avatar"
                  referrerPolicy="no-referrer"
                />
              </>
            )}
            {menuOpen ? (
              <SortUp handleClick={() => setMenuOpen(!menuOpen)} />
            ) : (
              <SortDown handleClick={() => setMenuOpen(!menuOpen)} />
            )}
            <div className="absolute top-14 right-0">
              {" "}
              {menuOpen ? (
                <Menu
                  onClick={() => setMenuOpen(!menuOpen)}
                  handleClick={setMenuOpen}
                  menuOpen={menuOpen}
                  currentUser={user}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* only show login button when the user is not logged in */}
        {!user && (
          <div className="flex items-center gap-2">
            <Link
              href={`/login?post_login_redirect_url=${pathname}`}
              className={` py-2 xsm:py-1 px-2 bg-gradient-to-r from-green-400 to-indigo-400 text-white rounded-lg flex items-center text-base gap-1 cursor-pointer hover:border ${
                user ? "hidden" : ""
              }`}
              onMouseOver={() => {
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}>
              <span>
                Login <span className="hidden md:inline-flex">/Sign Up</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer">
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </Link>
          </div>
        )}

        {!user && isOpen && (
          <>
            <Popup setIsOpen={setIsOpen} />
            <div className="arrow-up absolute  top-[80px] xsm:top-[58px] xsm:right-6 right-10 rotate-180"></div>
          </>
        )}
      </div>
    </nav>
  );
}
