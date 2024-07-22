"use client";
import React, { useEffect, useState } from "react";
import { handleSignOut, baseUrl } from "@/lib";

import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import parse from "html-react-parser";
import {
  Clipboard,
  Facebook,
  GithubIcon,
  NewTwitterIcon,
  Clock,
  Comment,
} from "@/assets";
import { calculateReadingTime } from "@/lib";
import secureLocalStorage from "react-secure-storage";
import SocialMediaModal from "@/components/SocialMediaModal";

export const dynamic = "auto";

export default function Profile() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [readingList, setReadingList] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetch(`${baseUrl}/me`).then((response) =>
          response.json()
        );
        if (userData) {
          setUser(userData);
          setUserLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch blogs when user data changes
  useEffect(() => {
    if (!userLoaded) return;

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/my-blogs`);
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [userLoaded]);
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

  function getSocialUrl(user, platform) {
    return (
      user.socialMedia?.find((social) => social.platform === platform)
        ?.handle || null
    );
  }

  const facebookUrl = getSocialUrl(user, "facebook");
  const linkedinUrl = getSocialUrl(user, "linkedin");
  const githubUrl = getSocialUrl(user, "github");
  const twitterUrl = getSocialUrl(user, "twitter");

  //function to show modals
  const showModal = async (platform) => {
    const modal = document.getElementById(`${platform}_modal`);
    if (modal) {
      modal.showModal();
    } else {
      console.log("modal not found");
    }
  };

  return (
    <div className="font-poppins w-full min-h-[400px] mx-auto px-8 md:w-4/5 md:mt-10">
      {/* have two cards rendered as flexbox */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start md:gap-5 ">
        {/* first card */}
        <div className="lg:w-1/3  bg-gray-50 border shadow rounded-md ">
          <div className="bg-gradient-to-t px-6 pt-2 from-gray-50 via-gray-100 to-cyan-400 w-full rounded-t-md">
            <Image
              src={user?.picture}
              height={120}
              width={120}
              alt="User Profile"
              className="w-[120px] h-[120px] rounded-full m-auto ring-offset-4 ring-2 ring-blue-600 italic ring-offset-white"
            />
            <p className="text-gray-600 font-semibold flex items-center justify-center ">
              <span>{user.username} </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={user.role === "admin" ? " #4b5563" : "#09A3E5"}
                stroke="#F7F8F9"
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
            <p className="text-gray-700 font-semibold mb-2 ">About</p>
            <p className="mb-2 tracking-wide text-[12px] sm:text-base md:text-sm bg-gray-200 p-1">
              {user?.bio ?? "You have have no bio yet"}
            </p>
            {user.role === "admin" && (
              <>
                <p className="text-gray-700 font-semibold mb-2 ">
                  Manage Blogs
                </p>
                <div className="w-full flex items-center justify-center border bg-gray-100 hover:bg-gray-200 mb-1 px-2 py-1 cursor-pointer hover:text-blue-500 h-8 rounded-md gap-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="24"
                    width="24">
                    <path d="M5.338 1.59a61.44 61.44 0 00-2.837.856.481.481 0 00-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 002.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 00.101.025.615.615 0 00.1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 002.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 00-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 011.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 01-2.517 2.453 7.159 7.159 0 01-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 01-1.048-.625 11.777 11.777 0 01-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 012.185 1.43 62.456 62.456 0 015.072.56z" />
                    <path d="M9.5 6.5a1.5 1.5 0 01-1 1.415l.385 1.99a.5.5 0 01-.491.595h-.788a.5.5 0 01-.49-.595l.384-1.99a1.5 1.5 0 112-1.415z" />
                  </svg>
                  <Link href="/admin/dashboard" className="">
                    Go to Dashboard
                  </Link>
                </div>
              </>
            )}
            <p className="font-bold">Socials</p>
            <div className="flex flex-col items-center space-y-1 py-2 gap-2">
              <button
                className={`w-full px-2 py-1 rounded-md border  group ${
                  facebookUrl
                    ? "bg-[#0284C7] text-white "
                    : "hover:bg-[#0284C7]  hover:text-white bg-gray-100"
                }`}>
                {facebookUrl ? (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2">
                    {" "}
                    <Facebook className="fill-white" />
                  </a>
                ) : (
                  <span
                    className="flex items-center justify-center gap-2"
                    onClick={() => {
                      showModal("facebook");
                    }}>
                    {" "}
                    <Facebook className="group-hover:fill-white" />
                    Connect Facebook
                  </span>
                )}
              </button>
              <button
                className={`w-full px-2 py-1 rounded-md border  group ${
                  linkedinUrl
                    ? "bg-[#0284C7] text-white "
                    : "hover:bg-[#0284C7]  hover:text-white bg-gray-100"
                }`}>
                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2">
                    {" "}
                    <svg
                      viewBox="0 0 960 1000"
                      fill="#0284C7"
                      height="26"
                      width="26"
                      className="fill-white">
                      <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                      <title>Linkedin</title>
                    </svg>
                  </a>
                ) : (
                  <span
                    className="flex items-center justify-center gap-2"
                    onClick={() => {
                      showModal("linkedin");
                    }}>
                    <svg
                      viewBox="0 0 960 1000"
                      fill="#0284C7"
                      height="26"
                      width="26"
                      className="group-hover:fill-white">
                      <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                      <title>Linkedin</title>
                    </svg>
                    Connect linkedin
                  </span>
                )}
              </button>
              <button
                className={`w-full px-2 py-1 rounded-md border  group ${
                  githubUrl
                    ? "bg-[#0284C7] text-white "
                    : "hover:bg-[#0284C7]  hover:text-white bg-gray-100"
                }`}>
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2">
                    {" "}
                    <GithubIcon />
                  </a>
                ) : (
                  <span
                    className="flex items-center justify-center gap-2"
                    onClick={() => {
                      showModal("github");
                    }}>
                    {" "}
                    <GithubIcon />
                    Connect Github
                  </span>
                )}
              </button>
              <button
                className={`w-full px-2 py-1  rounded-md border  group ${
                  twitterUrl
                    ? "bg-[#0284C7]  "
                    : "hover:bg-[#0284C7]  hover:text-white bg-gray-100"
                }`}>
                {" "}
                {twitterUrl ? (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2">
                    <NewTwitterIcon className=" bg-white  p-0.5 rounded-full" />
                  </a>
                ) : (
                  <span
                    className="flex items-center justify-center gap-2"
                    onClick={() => {
                      showModal("twitter");
                    }}>
                    <NewTwitterIcon className="group-hover:stroke-white " />{" "}
                    Connect Twitter
                  </span>
                )}
              </button>
            </div>
            <hr />
            <div className="flex items-center gap-2 justify-between text-sm  py-2 ">
              <Link
                href="/me/settings"
                className="hover:bg-gray-200 border hover:text-blue-600 p-1 w-full rounded-md h-8 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

              <button
                onClick={handleSignOut}
                className="hover:bg-gray-200 hover:text-red-500  p-1 w-full rounded-md h-8  border flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
              </button>
            </div>
          </div>
          <SocialMediaModal platform={"facebook"} user={user} />
          <SocialMediaModal platform={"linkedin"} user={user} />
          <SocialMediaModal platform={"github"} user={user} />
          <SocialMediaModal platform={"twitter"} user={user} />
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
            {blogs && blogs.length >= 1 ? (
              <>
                {blogs.map((blog) => (
                  <div key={blog.id} className="mb-2">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="hover:underline "
                      prefetch>
                      <span className="font-semibold  py-1 text-gray-700 hover:text-blue-500 hover:underline">
                        {blog.title}
                      </span>
                    </Link>
                    <div className="flex gap-2 flex-wrap text-sm">
                      {blog.tags.split(",").map((tag, index) => (
                        <Link
                          key={index}
                          href={`/search?search=${tag.trim()}`}
                          className="md:px-2 md:py-0.5 text-blue-600 md:bg-transparent md:hover:bg-blue-600 md:hover:text-white cursor-pointer md:border md:border-blue-600 md:rounded-xl ">
                          #{tag.trim()}
                        </Link>
                      ))}
                    </div>
                    <article className=" text-gray-500 leading-8 line-clamp-2">
                      {blog.body ? parse(blog.body) : blog.body}
                    </article>
                    <div className="flex items-center justify-between gap-1 space-y-1">
                      <p className="text-sm flex items-center gap-1 md:gap-2  text-black ">
                        <Clock />
                        {calculateReadingTime(blog.body)} min{" "}
                        <span className="xsm:hidden">read</span>
                      </p>
                      <p
                        className={`text-sm flex items-center px-1 rounded-lg border ${
                          blog.status === "PUBLISHED"
                            ? "text-green-600"
                            : " text-amber-600 "
                        }`}>
                        <svg
                          viewBox="0 0 220 1000"
                          fill="currentColor"
                          className={`text-sm  ${
                            blog.status === "PUBLISHED"
                              ? "text-green-600"
                              : " text-amber-600 "
                          }`}
                          height="20"
                          width="20">
                          <path d="M110 390c30.667 0 56.667 10.667 78 32s32 47.333 32 78c0 29.333-10.667 55-32 77s-47.333 33-78 33-56.667-11-78-33-32-47.667-32-77c0-30.667 10.667-56.667 32-78s47.333-32 78-32" />
                        </svg>
                        <span>{blog.status.toLowerCase()}</span>
                      </p>
                      <p className="text-sm  inline-flex items-center gap-1">
                        <Comment />
                        <span>{blog?._count?.comments}</span>
                      </p>
                    </div>

                    <hr className="my-2 border-1 border-slate-300" />
                  </div>
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
                    <div key={blog.id} className="mb-2">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="hover:underline "
                        prefetch>
                        <p className="font-semibold py-1 text-gray-700 hover:text-blue-500 inline-flex items-center justify-start">
                          {blog.title}{" "}
                          <span className="font-medium ">by {blog.author}</span>
                        </p>
                      </Link>
                      <div className="flex gap-2 flex-wrap text-sm">
                        {blog.tags.split(",").map((tag, index) => (
                          <Link
                            key={index}
                            href={`/search?search=${tag.trim()}`}
                            className="md:px-2 md:py-0.5 text-blue-600 md:bg-transparent md:hover:bg-blue-600 md:hover:text-white cursor-pointer md:border md:border-blue-600 md:rounded-xl ">
                            #{tag.trim()}
                          </Link>
                        ))}
                      </div>
                      <article className=" text-gray-500 leading-8 line-clamp-2">
                        {blog.body ? parse(blog.body) : blog.body}
                      </article>
                      <hr className="my-2 border-1 border-slate-300" />
                    </div>
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
