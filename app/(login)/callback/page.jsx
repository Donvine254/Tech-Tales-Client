"use client";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Axios from "axios";
import { authenticateUser } from "@/lib";
import Image from "next/image";
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
          const user = {
            ...data,
            password: githubCode,
          };
          //   authenticateUser(user, router, "accounts.github.com");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    })();
  }, [githubCode, router]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center bg-white border p-6 rounded-md">
        <Image
          src="https://miro.medium.com/v2/resize:fit:1125/1*biIy42Cn4Bnu0IkpUW1Zew.png"
          alt="github"
          height={200}
          width={200}
          priority
        />
        <Loader size={60} />
        <p className="text-center font-bold">Awaiting Github.com....</p>
      </div>
    </div>
  );
}
