"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import Axios from "axios";

export default function page() {
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
          const url = `https://techtales.up.railway.app/blogs/user/${user.id}`;
          const response = await Axios.get(url);
          setBlogs(response.data);
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
        <div className="p-6 bg-slate-100 border shadow">
          <Image
            src={user.picture}
            height={120}
            width={120}
            alt="User Profile"
            className="w-[120px] h-[120px] rounded-full m-auto"
          />
          <div className="flex items-center justify-between gap-4 text-gray-700">
            <h3>Email address</h3>
            <p>{user.email}</p>
          </div>
          <div className="flex items-center justify-between gap-4 text-gray-700">
            <h3 className="hover:text-gray-900 font-semibold">Username</h3>
            <p>{user.username}</p>
          </div>
          <Link
            href="/me/settings"
            className="text-green-500 font-bold cursor-pointer">
            Edit Profile
          </Link>
        </div>
        {/* second card */}
        <div className="p-6 space-y-2 bg-slate-100 border shadow">
          <h3 className="text-xl font-bold ">My Blogs</h3>
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
                      <p className="font-semibold  py-1">{blog.title}</p>
                      <p className=" text-gray-600 py-1 leading-8 line-clamp-1">
                        {blog.body}
                      </p>
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <p className="text-gray-500">
                Your published articles will appear here
              </p>
            )}
          </ul>

          <h3 className="text-xl font-semibold  my-2">Reading List</h3>
          <p>Your bookmarked blogs will appear here</p>
        </div>
      </div>
    </div>
  );
}
