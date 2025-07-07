import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <section className="flex items-center justify-center h-screen bg-opacity-50 backdrop-blur-3xl">
      <Loader2 className="h-6 w-6 animate-spin" />
    </section>
  );
}
