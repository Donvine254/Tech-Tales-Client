import React, { useState, useEffect } from "react";
import { GoogleIcon, GithubIcon } from "@/assets";
import { useGoogleLogin } from "@react-oauth/google";
import { getUserData, authenticateUser } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Popup({ setIsOpen }) {
  const [progress, setProgress] = useState(100);
  const router = useRouter();
  useEffect(() => {
    const closeAfterDelay = setTimeout(() => {
      setIsOpen(false);
    }, 10000); // Close after 10 seconds

    return () => clearTimeout(closeAfterDelay);
  }, [setIsOpen]);

  useEffect(() => {
    // function to decrease the progress by 50% every second
    const decreaseProgress = () => {
      setProgress((prev) => (prev > 0 ? prev - 2 : 0));
    };
    const interval = setInterval(decreaseProgress, 35);
    return () => {
      clearInterval(interval);
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    };
  }, [setIsOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  //functions to handle Login with google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginGoogleUsers(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
    },
  });

  async function loginGoogleUsers(access_token) {
    const user = await getUserData(access_token);
    if (user) {
      authenticateUser(user, router, "accounts.google.com", "home");
    }
  }

  return (
    <div
      className="fixed top-24 xsm:top-[70px] right-4 xsm:right-0 h-fit w-fit max-w-[350px] md:w-[350px]  z-10 mx-2 rounded-md bg-white shadow-xl overflow-hidden "
      id="login_popup">
      <div className="max-w-md ">
        <div className="px-4 py-1 bg-gradient-to-r from-green-400 via-cyan-500 to-indigo-400 text-white">
          <div className="flex gap-1 md:gap-4 items-center mt-2 mr-2">
            <Image
              src="/logo.png"
              height={30}
              width={30}
              className="italic object-cover"
              alt="logo"
            />

            <h2 className="font-medium text-sm md:text-base ">
              <span>Easily</span> Login to Tech Tales{" "}
            </h2>
          </div>
          {/* <hr className="w-full my-0.5" /> */}
          <button
            onClick={handleClose}
            className="rounded-full  focus:outline-none absolute top-0 right-0">
            <svg
              className="h-6 w-6  text-white hover:text-red-500 "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <title>Close</title>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col space-y-2 p-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-black hover:bg-black hover:text-white focus:outline-none bg-gray-200 bg-opacity-20"
            title="google login">
            <GoogleIcon />
            Login with Google
          </button>
          <Link
            href="https://github.com/login/oauth/authorize?client_id=2384921712f034fd32cf"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-black hover:bg-black hover:text-white focus:outline-none bg-gray-200 bg-opacity-20"
            title="github login">
            <GithubIcon className="h-6 w-6" />
            Login with Github
          </Link>
          <Link
            href="/login?post_login_redirect_url=relevant&referrer=homepage"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-black hover:bg-black hover:text-white bg-gray-200 bg-opacity-20 focus:outline-none"
            title="email-login">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
            </svg>
            Login with Email
          </Link>
        </div>
      </div>
      <div
        className={`h-1.5 bg-blue-600 ${
          progress < 50 ? "bg-red-600" : "bg-blue-600"
        }`}
        style={{ width: `${progress}%` }}></div>
    </div>
  );
}
