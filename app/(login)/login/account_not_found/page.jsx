import Loader from "@/components/Loader";
import { Suspense } from "react";
import AccountNotFound from "./AccountNotFound";
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center w-full min-h-screen mx-auto p-4 font-poppins ">
          <Loader />
        </div>
      }>
      <AccountNotFound />
    </Suspense>
  );
}
