"use client";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "@/axiosConfig";
import AdminUpdateProfileModal from "./ProfileUpdate";

export default function UserActionsButton({ onDelete, user, onEdit }) {
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

  //function to handleRoleUpdate
  async function handleRoleUpdate(user) {
    if (user.role === "admin") {
      Swal.fire({
        icon: "warning",
        text: `Do you want to demote ${user.username}? This action cannot be undone.`,
        confirmButtonText: "Demote",
        cancelButtonText: "Nevermind",
        showCancelButton: true,
        showCloseButton: true,
        footer: "Changes will reflect after refreshing this page",
        customClass: {
          confirmButton:
            "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
          cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
        },
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axiosInstance.patch(
              `https://techtales.up.railway.app/users/${user.id}`,
              { role: "user" }
            );
            toast.success("User role updated successfully.");
            if (typeof window !== "undefined" && window) {
              window.location.reload();
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
          }
        }
      });
    } else if (user.role === "user") {
      Swal.fire({
        icon: "warning",
        text: `Do you want to make ${user.username} an admin? This action cannot be undone.`,
        confirmButtonText: "Make Admin",
        cancelButtonText: "Nevermind",
        showCancelButton: true,
        showCloseButton: true,
        footer: "Changes will reflect after refreshing the page",
        customClass: {
          confirmButton:
            "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
          cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
        },
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axiosInstance.patch(
              `https://techtales.up.railway.app/users/${user.id}`,
              { role: "admin" }
            );
            toast.success("User role updated successfully");
            if (typeof window !== "undefined" && window) {
              window.location.reload();
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
          }
        }
      });
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
            <button
              className="py-1 text-gray-800 hover:text-blue-600 bg-cyan-100 w-full  hover:bg-gray-200 rounded-md"
              onClick={() => onEdit(user.id)}>
              Edit Details
            </button>
            {/* <button className="py-1 text-gray-800 hover:text-blue-600 bg-cyan-100 w-full  hover:bg-gray-200 rounded-md">
              Reset Password
            </button> */}
            <button
              className="py-1 text-gray-800 hover:text-blue-600 bg-cyan-100 w-full  hover:bg-gray-200 rounded-md"
              onClick={() => handleRoleUpdate(user)}>
              {user.role === "admin" ? "Demote User" : "Make Admin"}
            </button>
            <hr />
            <button
              className="py-1 text-gray-800 hover:text-red-600 bg-red-100 w-full  hover:bg-red-200 rounded-md"
              onClick={() => toast.success("incoming feature")}>
              Suspend User
            </button>

            <button
              className="py-1 text-gray-800 hover:text-red-600 bg-red-100 w-full  hover:bg-red-200 rounded-md"
              onClick={onDelete}>
              Delete User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
