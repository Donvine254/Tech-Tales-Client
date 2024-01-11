"use client";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Axios from "axios";
import { authenticateUser } from "@/lib";
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
          authenticateUser(data, router, "github.com");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    })();
  }, [githubCode]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <Loader size={60} />
        <p className="text-center font-bold">Awaiting Github.com....</p>
      </div>
    </div>
  );
}
