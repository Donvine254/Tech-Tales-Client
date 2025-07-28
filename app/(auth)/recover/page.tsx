"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  return (
    <Suspense fallback={<div>loading..</div>}>
      <div>
        <p>{token}</p>
      </div>
    </Suspense>
  );
}
