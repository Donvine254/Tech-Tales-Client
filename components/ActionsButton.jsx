"use client";
import React, { useState, useEffect, useRef } from "react";
import { Edit, Trash, Share } from "@/assets";
import ShareModal from "./ShareModal";
import toast from "react-hot-toast";

export default function ActionsButton({
  onDelete,
  onEdit,
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
        className="rounded-full p-1 bg-slate-300 cursor-pointer"
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
          className="absolute right-2 md:left-4 bottom-4 bg-white border shadow-lg rounded-md min-w-[180px] md:min-w-[150px] w-fit h-fit py-4 px-1 z-50 flex flex-col space-y-2"
          ref={popupRef}>
          <button
            className="flex items-center gap-2 px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md "
            onClick={onEdit}>
            <Edit />
            <span>Edit Blog</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md"
            onClick={handleSharing}>
            <Share />
            <span>Share Blog</span>
          </button>
          {blog.status === "PUBLISHED" ? (
            <button
              className="flex items-center gap-2  px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md "
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
              className="flex items-center gap-2  px-4 py-1 text-gray-800 hover:text-blue-600 w-full hover:bg-gray-200 rounded-md "
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

          <button
            className="flex items-center gap-2 px-4 py-1 w-full hover:text-red-600 rounded-md hover:bg-red-100 "
            onClick={onDelete}>
            <Trash />
            <span>Delete Blog</span>
          </button>
        </div>
      )}
      {showShareModal && (
        <div
          className="absolute right-2 md:left-4 bottom-4 bg-white border shadow-lg rounded-md min-w-[200px] w-fit h-fit py-4 z-50"
          ref={popupRef}>
          <ShareModal id={blog.id} slug={blog.slug} />
        </div>
      )}
    </div>
  );
}
