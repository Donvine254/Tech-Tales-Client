"use client";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
export default function SubscribeModal() {
  function closeModal() {
    const modal = document.getElementById("subscription_form");
    if (modal) modal.close();
  }

  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    if (!email.match(pattern)) {
      toast.error("Enter a valid email address");
      return null;
    }
    toast.success("You are in the inner circle!", {
      position: "bottom-center",
    });
    e.target.reset();
    closeModal();
    sessionStorage.setItem("subscription_form_status", false);
  }
  return (
    <div className="w-1/2">
      <button
        onClick={() => {
          const modal = document.getElementById("subscription_form");
          if (modal) modal.showModal();
        }}
        className="py-1 my-2 px-4 rounded-md bg-gray-700 text-white text-center hover:bg-green-400 w-full ">
        Subscribe
      </button>

      <dialog
        id="subscription_form"
        className="backdrop-blur-sm backdrop-blue-500 rounded-md">
        <form
          onSubmit={handleSubmit}
          className="relative h-full w-full flex flex-col shadow-sm max-w-lg p-6 space-y-4">
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
            className="hover:fill-red-500 hover:bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50 absolute top-0 right-0"
            onClick={closeModal}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
            <title>Close</title>
          </svg>
          <h1 className="font-bold xsm:text-base text-xl md:text-2xl text-center text-gray-700 ">
            Get in the Know!
          </h1>
          <p className="text-sm md:text-base  md:text-center leading-loose">
            Subscribe to our email newsletters and be notified about our latest
            blog posts and new features!
          </p>
          <div className="flex items-center ">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address *"
              maxLength={64}
              title="Email address must be a valid email address"
              required
              className="h-12 xsm:h-10 !bg-white  text-xl xsm:text-base  disabled:cursor-not-allowed disabled:opacity-50 flex-1 px-3 xsm:px-1 py-2 border-l border-y  focus:border-blue-500 bg-opacity-75  rounded-l-md outline-none"
            />
            <button
              className="px-4 xsm:px-1 py-2 bg-blue-500 hover:bg-blue-600 text-white border-r border-y border-blue-500 rounded-r-md h-12 xsm:h-10 text-xl xsm:text-base"
              title="subscribe">
              Subscribe
            </button>
          </div>
          <p className="xsm:text-xs text-sm font-medium md:text-center my-2 leading-loose text-gray-600">
            Your privacy matters and we will never spam you. You are free to{" "}
            <span className="text-blue-500 hover:underline">unsubscribe </span>
            any time!
          </p>
        </form>
        <div className="px-6 py-1 bg-cyan-100 border-t-2 border-cyan-500 text-center">
          By subscribing you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-cyan-600"
            title="terms">
            terms and conditions
          </Link>
        </div>
      </dialog>
    </div>
  );
}
