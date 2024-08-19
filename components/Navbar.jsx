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
        className="p-4 md:px-4 md:py-0 lg:px-4 lg:py-0 bg-[#f4f3f2]  flex w-full items-center justify-between fixed top-0 z-20 flex-wrap mb-2 border-b"
        id="parent div">
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-semibold lg:text-3xl m-auto cursor-pointer font-roboto">
            TECH
            <span className="text-white bg-cyan-500 px-0.5 rounded-md">
              TALES
              <span className="text-red-600 text-3xl md:text-6xl">.</span>
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
            className="hidden lg:flex md:items-center py-2 mx-1 px-4 border border-blue-500 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-cyan-500 hover:to-green-400 rounded-md font-extralight cursor-pointer hover:text-white shadow-md gap-3  "
            data-tooltip-id="create-post">
            <Tooltip
              id="create-post"
              place="bottom"
              content="Write your own blog post!"
              variant="info"
              style={{ padding: "2px", fontSize: "12px" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
            Create Post
          </Link>
          <div className="flex items-center gap-1 relative">
            {user && (
              <>
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="30"
                  width="30"
                  data-tooltip-id="notifications"
                  className="stroke-gray-600 focus:outline-none hover:bg-gray-300 rounded-full p-1 mx-2">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"
                  />
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
