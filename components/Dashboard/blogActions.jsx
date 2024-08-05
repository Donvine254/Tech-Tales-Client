"use client";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  IconEdit,
  Trash,
  ArchiveIcon,
  EditArchiveIcon,
  IconEye,
  IconEyeOffSharp,
  ShareIcon,
  PDFIcon,
} from "@/assets";
import Link from "next/link";

export default function BlogActionsButton({
  onDelete,
  blog,
  onUpdate,
  setBlogs,
}) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  //function to handleSharing
  async function handleSharing() {
    // setPopupOpen(false);
    // setShowShareModal(true);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${blog.slug}`,
          text: "Check out this blog from tech tales!",
          url: `https://techtales.vercel.app/blogs/${blog.slug}`,
        });
        console.log("Content shared successfully");
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error sharing content:", error);
      }
    } else {
      toast.error("Web Share API not supported in this browser.");
    }
  }

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="rounded-full p-1  cursor-pointer hover:bg-gray-500 hover:stroke-white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={() => setPopupOpen(!isPopupOpen)}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
        <title>More Actions</title>
      </svg>

      {isPopupOpen && (
        <div
          className="absolute right-4  top-6  h-fit min-w-[200px] z-50"
          ref={popupRef}>
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
            className="hover:fill-red-500  p-1 rounded-full hover:text-red-500 cursor-pointer z-50 absolute right-0 bg-white shadow"
            onClick={() => setPopupOpen(!isPopupOpen)}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
            <title>Close</title>
          </svg>
          <div className="px-2 py-4 my-3 flex flex-col gap-2 bg-white border shadow-lg rounded-md ">
            <Link
              href={`/create/${blog.slug}?user=admin`}
              className="py-1 text-gray-800 hover:text-blue-600  w-full  hover:bg-gray-200 rounded-md bg-gray-100 flex items-center gap-5 px-4 ">
              <IconEdit />
              <span>Edit Blog</span>
            </Link>
            <button
              className="py-1 text-gray-800 hover:text-blue-600 bg-gray-100 w-full  hover:bg-gray-200 rounded-md flex items-center gap-5 px-4 "
              onClick={handleSharing}>
              <ShareIcon stroke={2} size={20} />
              <span>Share Blog</span>
            </button>
            <button className="py-1 text-gray-800 hover:text-blue-600 bg-gray-100 w-full  hover:bg-gray-200 rounded-md flex items-center gap-5 px-4 ">
              <PDFIcon />
              <span>Download</span>
            </button>
            {blog.status === "PUBLISHED" ? (
              <button
                className=" bg-gray-100  py-1 text-gray-800 hover:text-amber-600 w-full hover:bg-amber-200 rounded-md  flex items-center gap-5 px-4 "
                onClick={() => onUpdate("UNPUBLISHED", blog.id, setBlogs)}>
                <IconEyeOffSharp />
                <span>Unpublish</span>
              </button>
            ) : (
              <button
                className="flex items-center  bg-gray-100  py-1 text-gray-800 hover:text-green-600 w-full hover:bg-green-100 rounded-md  gap-5 px-4  "
                onClick={() => onUpdate("PUBLISHED", blog.id, setBlogs)}>
                <IconEye />
                <p className="whitespace-nowrap">Publish Blog</p>
              </button>
            )}
            <hr />
            {blog.status === "ARCHIVED" ? (
              <button
                className="flex items-center  bg-gray-100  py-1 text-gray-800  w-full hover:bg-green-100 rounded-md hover:text-green-600  gap-5 px-4 "
                title="This action will set blog status as unpublished"
                onClick={() => onUpdate("UNPUBLISHED", blog.id, setBlogs)}>
                <EditArchiveIcon />
                <span>Unarchive </span>
              </button>
            ) : (
              <button
                className="flex items-center  bg-amber-100  py-1 text-gray-800  w-full hover:bg-amber-200 rounded-md hover:text-amber-600 gap-5 px-4"
                onClick={() => onUpdate("ARCHIVED", blog.id, setBlogs)}>
                <ArchiveIcon />
                <span>Archive Blog</span>
              </button>
            )}
            <button
              className="py-1 text-gray-800 hover:text-red-600 bg-red-50 w-full  hover:bg-red-100 rounded-md flex items-center gap-5 px-4 "
              onClick={onDelete}>
              <Trash stroke={2} />
              <span>Delete Blog</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
