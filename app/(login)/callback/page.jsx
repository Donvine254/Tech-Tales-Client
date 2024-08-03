"use client";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Axios from "axios";
import { authenticateUser } from "@/lib";
import Image from "next/image";
import { GithubIcon } from "@/assets";

export const dynamic = "force-dynamic";

export default function Callback() {
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
        }
      } else {
        router.replace("/login");
      }
    })();
  }, [githubCode, router]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
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
                  strokeColor="white"
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
        <div className="px-10 flex flex-col items-center justify-center content-center text-gray-600 ">
          <p className="text-center font-medium  my-2">
            Github is validating your identity.
          </p>
          <Loader size={60} />
        </div>

        <div>
          <hr />
          <p className="text-base px-2 font-medium my-2 text-gray-600">
            This taking too long? &nbsp;
            <a
              href="/login"
              className="text-blue-600 font-bold border py-0.5 px-1 hover:bg-blue-600 hover:text-white rounded-md">
              sign in another way
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
