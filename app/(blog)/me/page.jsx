"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import parse from "html-react-parser";

export default function Profile() {
  const user = getCurrentUser();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  useEffect(() => {
    if (!user) {
      toast.error("kindly login first!");
      navigate.replace("/login");
    } else if (user) {
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
  }, [user, navigate]);
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
        <div className="p-6 bg-gray-100 border shadow">
          <Image
            src={user.picture}
            height={120}
            width={120}
            alt="User Profile"
            className="w-[120px] h-[120px] rounded-full m-auto ring-offset-4 ring-2 ring-blue-600 ring-offset-white"
          />

          <p className="text-gray-700 font-semibold my-1">{user.username}</p>
          <p className="text-gray-700 mb-2">{user.email}</p>
          <Link
            href="/me/settings"
            className="text-green-500 hover:underline my-3 font-bold ">
            Edit Profile
          </Link>
        </div>
        {/* second card */}
        <div className="p-6 space-y-2 bg-slate-100 border shadow lg:flex-1">
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
                      href={`/blogs/${blog.slug}?id=${blog.id}`}
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
              <p className="text-gray-500">
                Your published articles will appear here
              </p>
            )}
          </ul>

          <h2 className="text-2xl font-semibold  my-2">Reading List</h2>
          <p>Your bookmarked blogs will appear here</p>
        </div>
      </div>
    </div>
  );
}
