"use client";
import React from "react";
import toast from "react-hot-toast";
export default function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
    toast.success("You are in the inner circle!", {
      position: "bottom-center",
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-500 bg-opacity-10 p-6 xsm:p-2 border-t border-b font-poppins">
      <h1 className="font-bold text-xl md:text-2xl text-center text-gray-600">
        Get in the Know!
      </h1>
      <p className="text-base md:text-[18px] text-gray-500 md:text-center leading-loose">
        Subscribe to our email newsletters and be notified about our latest blog
        posts
      </p>
      <div className="flex items-center w-full overflow-hidden md:w-2/3 lg:w-1/2 lg:mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Enter your email address *"
          required
          className="h-14 xsm:h-10  text-xl xsm:text-base  disabled:cursor-not-allowed disabled:opacity-50 flex-1 px-3 xsm:px-1 py-2 border-l border-y border-gray-200 rounded-l-md outline-none"
        />
        <button className="px-4 xsm:px-1 py-2 bg-blue-500 hover:bg-blue-600 text-white border-r border-y  rounded-r-md h-14 xsm:h-10 text-xl xsm:text-base">
          Subscribe
        </button>
      </div>
    </form>
  );
}
