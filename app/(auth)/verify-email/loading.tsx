"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black/20  bg-opacity-50 flex items-center justify-center">
      <Loader2 className="animate-spin size-8" />
    </div>
  );
}
