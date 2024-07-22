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
                className="flex items-center justify-center bg-red-100 gap-2  px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md "
                onClick={() => onUpdate("UNPUBLISHED", blog.id, setBlogs)}>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="24"
                  width="24">
                  <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
                  <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
                </svg>
                <span>Unpublish</span>
              </button>
            ) : (
              <button
                className="flex items-center justify-center bg-cyan-100 gap-2  px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md  "
                onClick={() => onUpdate("PUBLISHED", blog.id, setBlogs)}>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="24"
                  width="24">
                  <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                </svg>
                <p className="whitespace-nowrap">Publish Blog</p>
              </button>
            )}
            <hr />
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
