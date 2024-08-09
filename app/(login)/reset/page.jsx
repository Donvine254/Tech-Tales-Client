"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import EmailPage from "@/components/reset/email";
import Verification from "@/components/reset/verification";
import PasswordForm from "@/components/reset/passwordForm";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/lib";
import { FloatingShape } from "@/components/floatingShape";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <FloatingShape
            color="bg-green-500"
            size="w-64 h-64"
            top="-5%"
            left="10%"
            delay={0}
          />
          <FloatingShape
            color="bg-emerald-500"
            size="w-48 h-48"
            top="70%"
            left="80%"
            delay={5}
          />
          <FloatingShape
            color="bg-lime-500"
            size="w-32 h-32"
            top="40%"
            left="-10%"
            delay={2}
          />
          <div className="loader"></div>
        </div>
      }>
      <div
        className="min-h-screen bg-gradient-to-br
    from-cyan-900 via-cyan-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />
        <ResetPage />
      </div>
    </Suspense>
  );
}

function ResetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const step = searchParams.get("action");

  async function handleCodeVerification(code, email, setError) {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/verify-token`, {
        email: email,
        code: code,
      });
      const data = await response.data;
      const encodedEmail = btoa(email);
      router.replace(
        `/reset?action=new_password&rs=${encodeURIComponent(encodedEmail)}`
      );
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setError(error.response?.data?.error);
      setLoading(false);
    }
  }
  return (
    <section>
      <div
        className={
          step === "verification" || step === "new_password" ? "hidden" : ""
        }>
        <EmailPage />
      </div>
      {step === "verification" && (
        <Verification
          loading={loading}
          verifyCode={handleCodeVerification}
          setLoading={setLoading}
        />
      )}
      {step === "new_password" && <PasswordForm />}
    </section>
  );
}
