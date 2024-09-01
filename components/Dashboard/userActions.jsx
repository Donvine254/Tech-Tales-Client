"use client";
import React, { useState, useEffect, useRef } from "react";
import { handleRoleUpdate, handleUserStatusUpdate } from "@/lib";
import { IconEdit, Trash } from "@/assets";
export default function UserActionsButton({
  onDelete,
  user,
  onEdit,
  setUsers,
  onRestore
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

  //function to handleRestoreUserAccount

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
          className="absolute right-4 top-6  h-fit min-w-[200px] z-50"
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
            <button
              className="py-1 text-gray-800 hover:text-blue-600 bg-gray-100 w-full  hover:bg-gray-200 rounded-md flex items-center gap-5 px-4 "
              onClick={() => onEdit(user.id)}>
              <IconEdit />
              <span>Edit Details</span>
            </button>
            {user.status !== "DELETED" &&
              user.status !== "SUSPENDED" &&
              user.status !== "DEACTIVATED" && (
                <button
                  className="py-1 text-gray-800 hover:text-blue-600 bg-gray-100 w-full  hover:bg-gray-200 rounded-md flex items-center gap-5 px-4"
                  onClick={() =>
                    handleRoleUpdate(
                      user.id,
                      user.role,
                      user.username,
                      setUsers
                    )
                  }>
                  <svg
                    viewBox="0 0 640 512"
                    fill="currentColor"
                    height="20"
                    width="20">
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c1.8 0 3.5-.2 5.3-.5-76.3-55.1-99.8-141-103.1-200.2-16.1-4.8-33.1-7.3-50.7-7.3h-91.5zm308.8-78.3l-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2 5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7V273.8l95.4 38.2z" />
                  </svg>
                  <span>
                    {user.role === "admin" ? "Demote User" : "Make Admin"}
                  </span>
                </button>
              )}
            <hr />
            {user.status !== "DELETED" &&
              user.status !== "DEACTIVATED" &&
              (user.status === "SUSPENDED" ? (
                <button
                  className="py-1 text-gray-800 hover:text-green-600 bg-gray-100 w-full hover:bg-green-200 rounded-md flex items-center gap-5 px-4"
                  onClick={() =>
                    handleUserStatusUpdate(
                      user.id,
                      user.username,
                      "INACTIVE",
                      setUsers
                    )
                  }>
                  <svg fill="none" viewBox="0 0 15 15" height="20" width="20">
                    <path
                      stroke="currentColor"
                      d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 110-14 7 7 0 010 14z"
                    />
                  </svg>
                  <span>Unsuspend User</span>
                </button>
              ) : (
                <button
                  className="py-1 text-gray-800 hover:text-amber-600 bg-gray-100 w-full hover:bg-amber-200 rounded-md flex items-center gap-5 px-4"
                  onClick={() =>
                    handleUserStatusUpdate(
                      user.id,
                      user.username,
                      "SUSPENDED",
                      setUsers
                    )
                  }>
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="20"
                    width="20">
                    <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5l267.7 267.7zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256z" />
                  </svg>
                  <span>Suspend User</span>
                </button>
              ))}
            {user.status === "DELETED" && (
              <button
                className="py-1 text-gray-800 hover:text-green-600 bg-gray-100 w-full hover:bg-green-200 rounded-md flex items-center gap-5 px-4"
                onClick={() => onRestore(user.id)}>
                <svg fill="none" viewBox="0 0 15 15" height="20" width="20">
                  <path
                    stroke="currentColor"
                    d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 110-14 7 7 0 010 14z"
                  />
                </svg>
                <span>Restore User</span>
              </button>
            )}
            <button
              className="py-1 text-gray-800 hover:text-red-600 bg-red-50 w-full  hover:bg-red-200 rounded-md flex items-center gap-5 px-4"
              onClick={() => onDelete(Number(user.id), user.status)}>
              <Trash stroke={2} /> <span>Delete User</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
