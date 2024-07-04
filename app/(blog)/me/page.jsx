"use client";
import React, { useEffect, useState } from "react";
import { clearLocalStorage, baseUrl } from "@/lib";
import { revalidatePage } from "@/lib/actions";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import parse from "html-react-parser";
import { Clipboard, Facebook, NewTwitterIcon } from "@/assets";
import secureLocalStorage from "react-secure-storage";

export const dynamic = "auto";

export default function Profile() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [readingList, setReadingList] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userData = await fetch(`${baseUrl}/me`).then((response) =>
          response.json()
        );
        if (userData) {
          setUser(userData);
          const response = await fetch(`${baseUrl}/my-blogs/${userData?.id}`, {
            cache: "force-cache",
          });
          const data = await response.json();
          setBlogs(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  //useEffect to get user reading list
  useEffect(() => {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    setReadingList(bookmarkedBlogs);
    (async () => {
      try {
        const response = await fetch(`${baseUrl}/blogs`, {
          next: { revalidate: 600 },
        });
        const data = await response.json();
        setAllBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    })();
  }, []);
  const filteredBlogs = allBlogs.filter((blog) => readingList[blog.id]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[300px] md:h-[600px]">
        <Loader size={60} />
      </div>
    );
  }
  //function to signout
  function handleSignout() {
    clearLocalStorage();
    toast.success("logged out successfully");
    revalidatePage("/my-blogs");
    if (typeof window !== undefined) {
      window.location.href = "/";
    }
  }
  return (
    <div className="font-poppins w-full min-h-[400px] mx-auto px-8 md:w-4/5 md:mt-10">
      {/* have two cards rendered as flexbox */}
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-start lg:gap-5 ">
        {/* first card */}
        <div className="lg:w-1/3  bg-gray-50 border shadow rounded-md ">
          <div className="bg-gradient-to-t px-6 pt-2 from-gray-50 via-gray-100 to-cyan-400 w-full">
            <Image
              src={user?.picture}
              height={120}
              width={120}
              alt="User Profile"
              className="w-[120px] h-[120px] rounded-full m-auto ring-offset-4 ring-2 ring-blue-600 italic ring-offset-white"
            />
            <p className="text-gray-700 font-semibold flex items-center justify-center ">
              <span>{user.username} </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#09A3E5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-1">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </p>
            <p className="text-gray-700 mb-2 break-words text-sm text-center">
              {user.email}
            </p>
          </div>
          <div className="px-6 py-1">
            <p className="text-gray-700 font-semibold mb-2">About</p>
            <p className="mb-2 tracking-wide text-[12px] md:text-sm bg-gray-200 p-1">
              {user?.bio ?? "You have have no bio yet"}
            </p>
            <div className="flex items-center my-2 gap-2">
              <p className="font-bold">Socials:</p>
              <a href={`https://www.facebook.com`} target="_blank">
                {" "}
                <Facebook />
              </a>
              <a href={`https://www.linkedin.com`} target="_blank">
                {" "}
                <svg
                  viewBox="0 0 960 1000"
                  fill="#0284C7"
                  height="26"
                  width="26">
                  <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                  <title>Linkedin</title>
                </svg>
              </a>

              <a href={`https://www.github.com`} target="_blank">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="white"
                  className="cursor-pointer bg-black p-0.5 rounded-full">
                  <title>Github</title>
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href={`https://www.x.com`} target="_blank">
                <NewTwitterIcon className=" bg-white border-2 border-black p-0.5 rounded-full " />
              </a>
            </div>
            <div className="flex flex-col text-sm">
              <Link
                href="/my-blogs"
                className=" bg-gray-200 text-blue-600 p-1  w-full rounded-md my-1  flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>My Blogs</span>
              </Link>
              <Link
                href="/me#bookmarks"
                className=" hover:bg-gray-200 hover:text-blue-600 p-1  w-full rounded-md my-1  flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span>My Bookmarks</span>
              </Link>

              <Link
                href="/me/settings"
                className="hover:bg-gray-200 hover:text-blue-600 p-1 w-full rounded-md my-1  flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Edit Profile</span>
              </Link>
              <Link
                href="/help"
                className="hover:bg-gray-200 hover:text-blue-600 p-1 w-full rounded-md my-1  flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  fill="none"
                  stroke="currentColor">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <line x1="12" x2="12" y1="16" y2="12" />
                  <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
                <span>Help Center</span>
              </Link>

              <p
                onClick={handleSignout}
                className="hover:bg-gray-200 hover:text-red-500 cursor-pointer p-1 w-full rounded-md my-1  flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span>Log Out</span>
              </p>
            </div>
          </div>
        </div>
        {/* second card */}
        <div className="lg:w-2/3 p-6 space-y-2 bg-gray-50 border shadow rounded-md">
          <h1 className="text-2xl font-semibold ">My Blogs</h1>
          {loading && (
            <div className="flex items-center justify-center">
              <Loader size={30} />
            </div>
          )}
          <ul>
            {blogs && blogs.length > 1 ? (
              <>
                {blogs.map((blog) => (
                  <li key={blog.id} className="mb-2">
                    <Link
                      href={`/blogs/${blog.id}?title=${blog.slug}`}
                      className="">
                      <p className="font-semibold  py-1 text-gray-700 ">
                        {blog.title}
                      </p>
                      <p className=" text-gray-500 leading-8 line-clamp-2">
                        {blog.body ? parse(blog.body) : blog.body}
                      </p>
                    </Link>
                    <hr className="my-2 border-1 border-slate-300" />
                  </li>
                ))}
              </>
            ) : (
              !loading && (
                <div>
                  <div className="flex items-center justify-center py-1">
                    <Clipboard />
                  </div>
                  <p className="text-gray-600">
                    Looks like you have not written any blogs yet! Your
                    published blogs will appear here.
                  </p>
                </div>
              )
            )}
          </ul>

          <h2 className="text-2xl font-semibold  my-2" id="bookmarks">
            Reading List
          </h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader size={30} />
            </div>
          ) : (
            <ul>
              {filteredBlogs.length > 0
                ? filteredBlogs.map((blog) => (
                    <li key={blog.id} className="mb-2">
                      <Link href={`/blogs/${blog.id}?title=${blog.slug}`}>
                        <p className="font-semibold py-1 text-gray-700">
                          {blog.title}{" "}
                          <span className="font-medium ">by {blog.author}</span>
                        </p>
                      </Link>
                      <p className=" text-gray-500 leading-8 line-clamp-2">
                        {blog.body ? parse(blog.body) : blog.body}
                      </p>
                      <hr className="my-2 border-1 border-slate-300" />
                    </li>
                  ))
                : !loading && (
                    <div>
                      <div className="flex items-center justify-center py-1">
                        <Clipboard />
                      </div>
                      <p className="text-gray-600 text-center">
                        All clear. Your bookmarked blogs will appear here
                      </p>
                    </div>
                  )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
