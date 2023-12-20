"use client";
import React, { useEffect } from "react";
import { getCurrentUser } from "@/lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import Axios from "axios";
export default function page() {
  const user = getCurrentUser();
  const navigate = useRouter();
  useEffect(() => {
    if (!user) {
      toast.error("Login required to perform this action!");
      navigate.replace("/login");
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
      {/* first card */}
      <div className=" p-6 ">
        <Image
          src={user.picture}
          height={120}
          width={120}
          alt="User Profile"
          className="w-[120px] h-[120px] rounded-full m-auto"
        />
        <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
          <h3>Email address</h3>
          <p>{user.email}</p>
        </div>
        <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
          <h3 className="hover:text-gray-900 font-semibold">Username</h3>
          <p>{user.username}</p>
        </div>
      </div>
      {/* second card */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Published Articles</h3>
        <ul>
          {user.articles?.map((article) => (
            <li key={article.id} className="mb-2">
              {article.title}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Reading List</h3>
          <ul>
            {user.readingList?.map((article) => (
              <li key={article.id} className="mb-2">
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
