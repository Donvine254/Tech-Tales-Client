"use client";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";
import Callback from "./callback";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }>
      <Callback />
    </Suspense>
  );
}
