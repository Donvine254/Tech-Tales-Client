"use client";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@/lib/utils";
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

  return (
    <div
      className={`bg-gray-50 font-roboto shadow-md rounded-lg max-w-fit p-6 relative cookie-alert ${
        show ? "show" : ""
      }`}>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
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
        <h1 className="text-lg font-bold">&#x1F36A; Do you like cookies?</h1>
        <p className="text-gray-700 mt-2">
          We use cookies to ensure you get the best experience on our website.
        </p>
        <div className="flex justify-end mt-4 gap-2">
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
