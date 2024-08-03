import { Suspense } from "react";
import ResetPage from "./reset";
import ResetMainPage from "@/components/reset/reset";

export default function Page() {
  return (
    <Suspense fallback={<ResetMainPage />}>
      <ResetPage />
    </Suspense>
  );
}
