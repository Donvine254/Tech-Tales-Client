import React, { useState, useEffect } from "react";
import { GoogleIcon, GithubIcon } from "@/assets";
import { useGoogleLogin } from "@react-oauth/google";
import { getUserData, authenticateUser } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Popup({ setIsOpen }) {
  const [progress, setProgress] = useState(100);
  const router = useRouter();
  useEffect(() => {
    const closeAfterDelay = setTimeout(() => {
      setIsOpen(false);
    }, 10000); // Close after 10 seconds

    return () => clearTimeout(closeAfterDelay);
  }, []);

  useEffect(() => {
    // function to decrease the progress by 10% every second
    const decreaseProgress = () => {
      setProgress((prev) => (prev > 0 ? prev - 10 : 0));
    };
    const interval = setInterval(decreaseProgress, 1000);
    return () => clearInterval(interval);
  }, []);

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
      className="fixed top-24 xsm:top-20 right-4 xsm:right-0 h-fit w-fit max-w-[300px]  z-10 mx-2 rounded-md bg-white shadow-lg overflow-hidden "
      id="login_popup">
      <div className="p-4 max-w-md">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="font-medium text-[18px] text-gray-600 my-2">
            Sign in to Tech Tales to access personalized contents and settings
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none absolute top-0 right-0">
            <svg
              className="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-black hover:bg-blue-600 hover:text-white focus:outline-none"
            title="google login">
            <GoogleIcon />
            Sign In with Google
          </button>
          <Link
            href="https://github.com/login/oauth/authorize?client_id=2384921712f034fd32cf"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-black hover:bg-black hover:text-white focus:outline-none"
            title="github login">
            <GithubIcon className="h-6 w-6 mr-2" />
            Sign In with Github
          </Link>
          <Link
            href="/Sign In"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-black hover:bg-gray-200  focus:outline-none"
            title="email-login">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="24"
              width="24"
              className="h-6 w-6 mr-2">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
            </svg>
            Sign In with Email
          </Link>
        </div>
      </div>
      <div className="h-2 bg-blue-500 " style={{ width: `${progress}%` }}></div>
    </div>
  );
}
