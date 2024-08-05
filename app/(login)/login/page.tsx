import React, { Suspense } from "react";
import LoginPage from "./login";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      }>
      <LoginPage />
    </Suspense>
  );
}
