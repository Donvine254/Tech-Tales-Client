"use client";
import { useSearchParams } from "next/navigation";
import EmailPage from "@/components/reset/email";
import Verification from "@/components/reset/verification";
import PasswordForm from "@/components/reset/passwordForm";
export default function ResetPage() {
  const searchParams = useSearchParams();
  const step = searchParams.get("action");
  return (
    <section className="w-full">
      <div
        className={
          step === "verification" || step === "new_password" ? "hidden" : ""
        }>
        <EmailPage />
      </div>
      {step === "verification" && <Verification />}
      {step === "new_password" && <PasswordForm />}
    </section>
  );
}
