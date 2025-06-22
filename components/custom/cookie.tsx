"use client";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@/lib/cookie";
import Image from "next/image";

const CookieAlert = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!getCookie("acceptCookies")) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const toggleClass = () => {
    setShow(false);
    const alert = document.getElementById("cookie-alert");
    if (alert) {
      alert.classList.remove("open");
    }
  };

  const acceptCookies = () => {
    setCookie("acceptCookies", true, 60);
    toggleClass();
  };

  //   if (user) {
  //     return null;
  //   }

  return (
    <div
      className={`bg-gray-200 text-gray-800  text-sm shadow rounded-lg max-w-fit px-4 py-2 relative xsm:w-full sm:w-fit xs:bottom-0 xs:right-0 cookie-alert ${
        show ? "show" : ""
      }`}>
      <button
        className="absolute top-2  right-2 hover:text-red-500 focus:outline-none"
        onClick={toggleClass}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <title>Close</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div>
        <h1 className="text-base font-bold inline-flex items-center gap-1">
          <Image src="/cookie.svg" alt="cookie" height={20} width={20} /> Do you
          like cookies?
        </h1>
        <p className=" mt-1">
          We use cookies to ensure you get the best experience on our website.
        </p>
        <div className="flex justify-end mt-1 gap-2">
          <a
            href="http://cookiesandyou.com/"
            target="_blank"
            title="learn more about cookies"
            className="text-blue-500 hover:underline px-4 py-1">
            Learn more
          </a>
          <button
            className="bg-blue-500 text-white px-4 py-1  rounded-md hover:bg-blue-600"
            title="accept-cookies"
            onClick={acceptCookies}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieAlert;
