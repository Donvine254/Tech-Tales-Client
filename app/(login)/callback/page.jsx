"use client";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Axios from "axios";
import { authenticateUser } from "@/lib";
import Image from "next/image";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const githubCode = searchParams.get("code");

  useEffect(() => {
    (async () => {
      if (githubCode) {
        try {
          const response = await Axios.post("/api", { code: githubCode });
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
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col items-center justify-center bg-white border p-6 rounded-md">
          <div className="flex items-center gap-1 w-full overflow-hidden">
            <Image
              src="https://miro.medium.com/v2/resize:fit:1125/1*biIy42Cn4Bnu0IkpUW1Zew.png"
              alt="github"
              height={200}
              width={200}
              priority
            />
            <p className="text-6xl">+</p>
            <Image
              src="/logo.png"
              height={50}
              width={50}
              alt="techtales"
              priority
            />
          </div>
          <p className="text-center font-medium text-gray-600 my-2">
            Github is validating your identity.
          </p>
          <Loader size={60} fill="grey" />
          <p className="text-base font-medium my-2 text-gray-600">
            This taking too long? &nbsp;
            <a
              href="/login"
              className="text-blue-600 font-bold border py-0.5 px-1 hover:bg-blue-600 hover:text-white rounded-md">
              sign in another way
            </a>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
