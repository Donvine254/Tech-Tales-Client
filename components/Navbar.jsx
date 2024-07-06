"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "./Search";
import { Menu } from "./Menu";
import Popup from "./LoginAlert";
import { baseUrl, clearLocalStorage, getCurrentUser } from "@/lib";
import { SortUp, SortDown } from "@/assets";
import Swal from "sweetalert2";

const user = getCurrentUser();
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/me`);
        if (!response.ok) {
          clearLocalStorage();
          if (user) {
            Swal.fire({
              title: "Session Expired",
              icon: "warning",
              showCloseButton: true,
              confirmButtonColor: "#09A3E5",
              confirmButtonText: "Okay",
              text: "Your session has expired. Kindly login again to continue.",
              iconColor: "red",
              footer: '<a href="/login">Click here to login again</a>',
            }).then((result) => {
              if (result.isDismissed) {
                window.location.reload();
              } else if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        clearLocalStorage();
      }
    };

    fetchUser();
  }, []);

  const pathname = usePathname().replace(/^\/+/, "") ?? "featured";
  return (
    <nav className="w-full font-crimson h-20">
      <div
        className="p-4 md:p-5 bg-[#f4f3f2] flex w-full items-center justify-between fixed top-0 z-20 flex-wrap mb-2 border-b-2"
        id="parent div">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold lg:text-4xl m-auto cursor-pointer">
            Tech Tales
            <span className="text-red-600 text-3xl md:text-5xl">.</span>
          </h1>
        </Link>

        <Search />

        <div
          className={`flex items-center md:gap-1 mr-2 ${!user ? "hidden" : ""}`}
          id="user present">
          <Link
            href="/create"
            className="hidden md:block py-2 mx-1 px-4 border border-blue-500 hover:bg-blue-500 rounded-md text-xl cursor-pointer hover:text-white shadow-md ">
            Create Post
          </Link>
          <div className="flex items-center gap-1 relative">
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
              className={` py-2 xsm:py-0.5 px-2 bg-gradient-to-r from-green-400 to-indigo-400 text-white rounded-lg flex items-center text-base gap-1 cursor-pointer hover:border ${
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
            {/* <Link
              href="/register?action=register&user=new"
              className={` py-2 xsm:py-0.5 px-2 border border-blue-500 hover:bg-blue-500 rounded-md text-xl xsm:hidden cursor-pointer hover:text-white ${
                user ? "hidden" : ""
              }`}>
              Sign Up
            </Link> */}
          </div>
        )}

        {!user && isOpen && <Popup setIsOpen={setIsOpen} />}
      </div>
    </nav>
  );
}
