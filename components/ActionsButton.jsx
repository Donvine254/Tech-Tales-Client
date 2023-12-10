"use client";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function ActionsButton({ onDelete, onEdit }) {
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
        className="rounded-full p-1 bg-slate-300 cursor-pointer"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={() => setPopupOpen(!isPopupOpen)}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>

      {isPopupOpen && (
        <div
          className="absolute right-2 md:left-2  bg-white border shadow-lg rounded-md min-w-[180px] md:min-w-[150px] w-fit h-fit py-4 z-50"
          ref={popupRef}>
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-blue-600 w-full  hover:font-bold"
            onClick={onEdit}>
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
              className="cursor-pointer">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span>Edit Blog</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-blue-600 w-full  hover:font-bold"
            onClick={() => toast.success("coming soon")}>
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
              className="cursor-pointer">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
            <span>Share Blog</span>
          </button>
          <button
            className="flex items-center gap-2 md:hidden px-4 py-2 text-gray-800 hover:text-blue-600 w-full  hover:font-bold"
            onClick={() => toast.success("coming soon")}>
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
              className="cursor-pointer">
              <path d="M3 3v18h18" />
              <path d="M13 17V9" />
              <path d="M18 17V5" />
              <path d="M8 17v-3" />
            </svg>
            <span>View Statistics</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 w-full hover:text-red-600 hover:font-bold"
            onClick={onDelete}>
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
              className="cursor-pointer ">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            <span>Delete Blog</span>
          </button>
        </div>
      )}
    </div>
  );
}
