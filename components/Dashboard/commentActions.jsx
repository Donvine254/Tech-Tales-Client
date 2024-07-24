"use client";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Link from "next/link";
import { Trash, FlagIcon, IconEye, IconEdit, IconEyeOffSharp } from "@/assets";
export default function CommentActionsButton({ onDelete, comment, onUpdate }) {
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
              href={`/blogs/${comment.blog.slug}#comments`}
              className="py-1 text-gray-800 hover:text-blue-600  w-full  hover:bg-gray-200 rounded-md bg-gray-100 flex items-center gap-5 px-4 ">
              <IconEdit />
              <span>Edit Comment</span>
            </Link>
            <button
              className="py-1 text-gray-800 hover:text-blue-600 bg-gray-100 w-full  hover:bg-gray-200 rounded-md flex items-center gap-5 px-4"
              onClick={() => {
                Swal.fire({
                  icon: "success",
                  title: "Here is the comment body:",
                  html: `<div style="text-align:start;font-style: italic;">${comment.body}</div>`,
                  showCloseButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "Close",
                  customClass: {
                    confirmButton:
                      "px-2 py-0.5 mx-2 rounded-md bg-blue-500 text-white ",
                  },
                  buttonsStyling: false,
                });
              }}>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="20"
                width="20">
                <path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM404 553.5c0 4.1-3.2 7.5-7.1 7.5H211.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm0-140c0 4.1-3.2 7.5-7.1 7.5H211.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm416 140c0 4.1-3.2 7.5-7.1 7.5H627.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm0-140c0 4.1-3.2 7.5-7.1 7.5H627.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45z" />
              </svg>
              <span>Read Comment</span>
            </button>
            {comment.status === "VISIBLE" ? (
              <button
                className=" bg-gray-100  py-1 text-gray-800 hover:text-amber-600 w-full hover:bg-amber-200 rounded-md  flex items-center gap-5 px-4 "
                onClick={() => onUpdate("HIDDEN", comment.id)}>
                <IconEyeOffSharp />
                <span>Hide Comment</span>
              </button>
            ) : (
              <button
                className="flex items-center  bg-gray-100  py-1 text-gray-800 hover:text-green-600 w-full hover:bg-green-100 rounded-md  gap-5 px-4  "
                onClick={() => onUpdate("VISIBLE", comment.id)}>
                <IconEye />
                <p className="whitespace-nowrap">Show Comment</p>
              </button>
            )}
            {comment.status === "FLAGGED" ? (
              <button
                className="py-1 text-gray-800 hover:text-green-600 bg-gray-100 w-full  hover:bg-green-200 rounded-md flex items-center gap-5 px-4"
                onClick={() => onUpdate("VISIBLE", comment.id)}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="24"
                  width="24">
                  <path d="M8 2c3 0 5 2 8 2s4-1 4-1v11M4 22V4M4 15s1-1 4-1 5 2 8 2M2 2l20 20" />
                </svg>
                <span>Unflag Comment</span>
              </button>
            ) : (
              <button
                className="py-1 text-gray-800 hover:text-amber-600 bg-amber-100 w-full  hover:bg-amber-200 rounded-md flex items-center gap-5 px-4"
                onClick={() => onUpdate("FLAGGED", comment.id)}>
                {/* first check if it is flagged */}
                <FlagIcon />
                <span>Flag Comment</span>
              </button>
            )}
            <hr />
            <button
              className="py-1 text-gray-800 hover:text-red-600 bg-red-50 w-full  hover:bg-red-200 rounded-md flex items-center gap-5 px-4 "
              onClick={onDelete}>
              <Trash stroke={2} />
              Delete Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
