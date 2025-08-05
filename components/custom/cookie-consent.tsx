"use client";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@/lib/cookie";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useSession } from "@/providers/session";

export default function CookieConsentAlert() {
  const [show, setShow] = useState(true);
  const { session, loading } = useSession();
  const [cookieStatus, setCookieStatus] = useState<string>("");

  useEffect(() => {
    const checkCookieStatus = () => {
      const cookiesAccepted = getCookie("__accept_cookies");
      setCookieStatus(cookiesAccepted);
    };
    checkCookieStatus();
  }, []);

  useEffect(() => {
    if (loading || cookieStatus === "") return;

    console.log("Cookie status:", cookieStatus);
    if (cookieStatus === "true") {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(true);
    }, 50000);
    return () => clearTimeout(timer);
  }, [cookieStatus, loading]);

  const toggleClass = () => {
    setShow(false);
    const alert = document.getElementById("cookie-alert");
    if (alert) {
      alert.classList.remove("show");
    }
  };

  const acceptCookies = () => {
    setCookie("__accept_cookies", true, 60);
    toggleClass();
  };
  if (loading || session || !show) return null;
  return (
    <div
      id="cookie-alert"
      className={`bg-card text-gray-800 dark:text-gray-200  text-sm shadow rounded-lg max-w-fit px-4 py-2 relative w-full sm:w-fit bottom-0 right-0  ${
        show ? "show" : ""
      }`}>
      <button
        className="absolute top-2  right-2 hover:text-red-500 focus:outline-none cursor-pointer"
        onClick={toggleClass}
        title="close">
        <X className="size-4" />
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
          <Button variant="link" size="sm">
            <a
              href="http://cookiesandyou.com/"
              target="_blank"
              title="learn more about cookies"
              className="text-blue-500 hover:underline px-4 py-1">
              Learn more
            </a>
          </Button>
          <Button
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600"
            title="accept-cookies"
            onClick={acceptCookies}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
