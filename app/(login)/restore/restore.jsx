"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { userAccountSelfRestore } from "@/lib/actions";
import toast from "react-hot-toast";

export default function RestorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    async function restoreAccount() {
      try {
        const encodedEmail = searchParams.get("e");
        const encodedId = searchParams.get("id");

        if (!encodedEmail || !encodedId) {
          toast.error("Invalid or missing parameters.");

          return;
        }
        const id = atob(encodedId);
        await userAccountSelfRestore(id);
        toast.success(
          "Your account was successfully restored. Proceed to Login"
        );
      } catch (error) {
        console.error("Error restoring account:", error);
        toast.error("An error occurred while restoring the account.");
      } finally {
        router.replace("/login");
      }
    }
    restoreAccount();
  }, [searchParams, router]);

  return (
    <div className="border w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white p-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="loader"></div>Restoring Account...
      </div>
    </div>
  );
}
