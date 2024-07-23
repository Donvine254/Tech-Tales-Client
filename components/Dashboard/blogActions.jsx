"use client";
import React, { useState, useEffect, useRef } from "react";
import ShareModal from "../ShareModal";

import Link from "next/link";

export default function BlogActionsButton({
  onDelete,
  blog,
  onUpdate,
  setBlogs,
}) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
        setShowShareModal(false);
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
  function handleSharing() {
    setPopupOpen(false);
    setShowShareModal(true);
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:fill-red-500  p-1 rounded-full hover:text-red-500 cursor-pointer z-50 absolute right-0"
            onClick={() => setPopupOpen(!isPopupOpen)}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
            <title>Close</title>
          </svg>
          <div className="px-2 py-4 flex flex-col gap-2 bg-white border shadow-lg rounded-md ">
            <Link
              href={`/create/${blog.slug}?user=admin`}
              className="py-1 text-gray-800 hover:text-blue-600  w-full  hover:bg-gray-200 rounded-md bg-cyan-100 text-center">
              Edit Blog
            </Link>
            <button
              className="py-1 text-gray-800 hover:text-blue-600 bg-cyan-100 w-full  hover:bg-gray-200 rounded-md"
              onClick={handleSharing}>
              Share Blog
            </button>
            {blog.status === "PUBLISHED" ? (
              <button
                className="flex items-center justify-center bg-cyan-100 gap-2  px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md "
                onClick={() => onUpdate("UNPUBLISHED", blog.id, setBlogs)}>
                <span>Unpublish</span>
              </button>
            ) : (
              <button
                className="flex items-center justify-center bg-cyan-100 gap-2  px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md  "
                onClick={() => onUpdate("PUBLISHED", blog.id, setBlogs)}>
                <p className="whitespace-nowrap">Publish Blog</p>
              </button>
            )}
            <hr />
            <button
              className="flex items-center justify-center bg-red-100 gap-2  px-4 py-1 text-gray-800  w-full hover:bg-red-200 rounded-md hover:text-red-600 "
              onClick={() => onUpdate("ARCHIVED", blog.id, setBlogs)}>
              <span>Archive Blog</span>
            </button>
            <button
              className="py-1 text-gray-800 hover:text-red-600 bg-red-100 w-full  hover:bg-red-200 rounded-md"
              onClick={onDelete}>
              Delete Blog
            </button>
          </div>
        </div>
      )}
      {showShareModal && (
        <div
          className="absolute right-4 top-6 bg-white border shadow-lg rounded-md min-w-[200px] w-fit h-fit py-4 z-50"
          ref={popupRef}>
          <ShareModal id={blog.id} slug={blog.slug} />
        </div>
      )}
    </div>
  );
}