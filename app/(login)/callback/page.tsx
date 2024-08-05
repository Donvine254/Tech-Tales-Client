import React, { Suspense } from "react";
import Callback from "./callback";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      }>
      <Callback />
    </Suspense>
  );
}
