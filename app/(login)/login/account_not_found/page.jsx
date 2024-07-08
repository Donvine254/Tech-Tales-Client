import Loader from "@/components/Loader";
import { Suspense } from "react";
import AccountNotFound from "./AccountNotFound";
export default function Page() {
  return (
    <Suspense
      fallback={
        (className =
          "flex flex-col items-center justify-center w-full min-h-screen  p-4 font-poppins " >
          <Loader />)
      }>
      <AccountNotFound />
    </Suspense>
  );
}
