"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import parse from "html-react-parser";
import { Clipboard } from "@/assets";
import secureLocalStorage from "react-secure-storage";

export const dynamic = "auto";

export default function Profile() {
  const user = getCurrentUser();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [readingList, setReadingList] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    let isMounted = true;
    if (!user && isMounted) {
      toast.error("kindly login first!");
      router.replace("/login?post_login_redirect_url=me");
    } else if (user && isMounted) {
      const fetchBlogs = async () => {
        try {
          const response = await fetch(
            `https://techtales.up.railway.app/blogs/user/${user.id}`
          );
          const data = await response.json();
          setBlogs(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching blogs:", error);
        }
      };

      fetchBlogs();
    }
    return () => {
      isMounted = false;
    };
  }, [user, router]);
  //useEffect to get user reading list
  useEffect(() => {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    setReadingList(bookmarkedBlogs);
    (async () => {
      try {
        const response = await fetch(`https://techtales.up.railway.app/blogs`, {
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

  return (
    <div className="font-poppins w-full min-h-[400px] mx-auto px-8 md:w-2/3">
      {/* have two cards rendered as flexbox */}
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-start lg:gap-5 ">
        {/* first card */}
        <div className="lg:w-1/3 p-6 bg-gray-50 border shadow rounded-md hover:bg-gray-100">
          <Image
            src={user.picture}
            height={120}
            width={120}
            alt="User Profile"
            className="w-[120px] h-[120px] rounded-full m-auto ring-offset-4 ring-2 ring-blue-600 ring-offset-white"
          />

          <p className="text-gray-700 font-semibold my-2">{user.username}</p>
          <p className="text-gray-700 mb-2 break-words">{user.email}</p>
          <p className="text-gray-700 font-semibold mb-2">Bio</p>
          <p className="mb-2 tracking-wide text-sm">
            {user?.bio ?? "You have have no bio yet"}
          </p>
          <Link
            href="/me/settings"
            className="text-green-500 hover:underline my-3 font-bold ">
            Edit Profile
          </Link>
        </div>
        {/* second card */}
        <div className="lg:w-2/3 p-6 space-y-2 bg-gray-50 border shadow rounded-md">
          <h1 className="text-2xl font-bold ">My Blogs</h1>
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

          <h2 className="text-2xl font-semibold  my-2">Reading List</h2>
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
