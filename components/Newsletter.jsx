"use client";
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";

export default function Newsletter() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}>
      <Form />
    </GoogleReCaptchaProvider>
  );
}

function Form() {
  const [showForm, setShowForm] = useState(true);
  const [token, setToken] = useState(null);
  const pathname = usePathname();
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve the form status from session storage
      const storedStatus = sessionStorage.getItem("subscription_form_status");
      setShowForm(storedStatus === "true" ? true : false);
      if (storedStatus === null || storedStatus == undefined) {
        sessionStorage.setItem("subscription_form_status", "true");
        setShowForm(true);
      }
    }

    if (
      pathname !== "/" &&
      pathname !== "/relevant" &&
      pathname !== "/latest" &&
      pathname !== "/me/blogs" &&
      pathname !== "/top"
    ) {
      setShowForm(false);
    }
  }, [pathname]);

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
    // Update session storage when the form state changes
    sessionStorage.setItem("subscription_form_status", false);
    setShowForm(false);
  }
  function handleClose() {
    sessionStorage.setItem("subscription_form_status", false);
    setShowForm(false);
  }
  return (
    <div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-blue-200 bg-opacity-30 p-6 xsm:p-2 border-y font-poppins transition-all ease-in-out relative">
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none absolute top-0 right-0 ">
            <svg
              className="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
          <h1 className="font-bold xsm:text-base text-xl md:text-2xl text-center text-gray-600">
            Get in the Know!
          </h1>
          <p className=" xsm:text-[12px] text-base md:text-[18px] text-gray-500 md:text-center leading-loose">
            Subscribe to our email newsletters and be notified about our latest
            blog posts and new features!
          </p>
          <div className="flex items-center w-full overflow-hidden md:w-2/3 lg:w-1/2 lg:mx-auto">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address *"
              maxLength={64}
              title="Email address must be a valid email address"
              required
              className="h-12 xsm:h-10 !bg-white  text-xl xsm:text-base  disabled:cursor-not-allowed disabled:opacity-50 flex-1 px-3 xsm:px-1 py-2 border-l border-y focus:bg-opacity-100 bg-opacity-75  rounded-l-md outline-none"
            />
            <button className="px-4 xsm:px-1 py-2 bg-blue-500 hover:bg-blue-600 text-white border-r border-y  rounded-r-md h-12 xsm:h-10 text-xl xsm:text-base">
              Subscribe
            </button>
          </div>
          <p className="xsm:text-[10px] text-sm font-medium md:text-center my-2 leading-loose text-gray-600">
            Your privacy matters and we will never spam you. You are free to{" "}
            <span className="text-blue-500 hover:underline">unsubscribe </span>
            any time!
            <br className="sm:block" />
            <span>By subscribing you agree to our terms and conditions</span>
          </p>
          <GoogleReCaptcha
            onVerify={(token) => {
              setToken(token);
            }}
          />
        </form>
      )}
    </div>
  );
}
