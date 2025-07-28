import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";          
  return (
    <Suspense fallback={<div>loading..</div>}>
      <div>
        <p>{query}</p>
      </div>
    </Suspense>
  );
}
