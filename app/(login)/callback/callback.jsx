"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Axios from "axios";
import { authenticateUser } from "@/lib";
import Image from "next/image";
import { GithubIcon } from "@/assets";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

export default function Callback() {
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const githubCode = searchParams.get("code");

  useEffect(() => {
    (async () => {
      if (githubCode) {
        try {
          const response = await Axios.post("api/auth/oauth-login/github", {
            code: githubCode,
          });

          const data = await response.data;
          authenticateUser(data, router, "accounts.github.com");
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(true);
        }
      } else {
        router.replace("/login");
      }
    })();
  }, [githubCode, router]);

  return (
    <div className="flex items-center justify-center min-h-screen xsm:px-4 ">
      <div className="flex flex-col items-center justify-center bg-white border rounded-md space-y-4">
        <div className="flex items-center justify-between w-full p-10 ">
          {/* first child */}
          <div className="h-20 w-20 rounded-full shadow shadow-gray-400 ">
            <GithubIcon size={80} className="" />
          </div>
          {/* second child */}
          <div className="flex items-center flex-1 ">
            <hr className="border border-gray-500 border-dotted  w-full" />
            <div className="text-green-500 w-fit whitespace-nowrap ">
              <svg fill="none" viewBox="0 0 15 15" height="30" width="30">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  stroke="white"
                  d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr className="border border-gray-500 border-dotted w-full" />
          </div>
          {/* third child */}
          <div className="h-20 w-20 rounded-full p-2 bg-[#222222] shadow shadow-gray-400">
            {" "}
            <Image
              src="/logo.png"
              height={50}
              width={50}
              alt="techtales"
              className="w-[95%] h-[95%] rounded-full italic"
              priority
            />
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="#ef4444"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-red-500">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
            <p className="text-sm text-red-500">
              Github Authentication Failed!
            </p>
          </div>
        ) : (
          <div className="px-10 flex flex-col items-center justify-center content-center text-gray-600 ">
            <p className="text-center font-medium  my-2">
              Github is validating your identity.
            </p>
            <div className="loader"></div>
          </div>
        )}

        <div>
          <hr />
          <p className="text-base px-2 font-medium font-segoi my-2 text-gray-600">
            This taking too long? &nbsp;
            <a
              className="text-blue-500 inline-flex items-center  gap-1 hover:underline border shadow px-1 rounded-md z-50"
              href="/login">
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="16"
                width="16">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="M112 352l-64-64 64-64"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="M64 288h294c58.76 0 106-49.33 106-108v-20"
                />
              </svg>
              <span>Back to Login</span>
            </a>
          </p>
        </div>
        <div className="px-6 max-w-sm text-sm xsm:text-xs text-center py-2 bg-cyan-100 border-t-2 border-cyan-500 text-gray-600">
          <p>
            By continuing you agree to our{" "}
            <a href="/terms" className="text-blue-500 underline z-50">
              terms and conditions
            </a>
            &nbsp; which includes giving us access to your github profile
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
