"use client";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";
import Callback from "./callback";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full mx-auto m-2 min-h-[320px] px-8 md:w-4/5 md:mt-10 font-poppins flex items-center justify-center content-center">
          <Loader size={60} />
        </div>
      }>
      <Callback />
    </Suspense>
  );
}
