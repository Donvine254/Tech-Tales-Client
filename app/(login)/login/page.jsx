import Loader from "@/components/Loader";
import { Suspense } from "react";
import LoginPage from "./Login";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }>
      <LoginPage />
    </Suspense>
  );
}
