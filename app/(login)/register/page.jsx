"use client";
import { useState } from "react";
import VerifyEmail from "@/components/register/email";
import Verification from "@/components/reset/verification";
import { useSearchParams, useRouter } from "next/navigation";
import { baseUrl } from "@/lib";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get("action");
  const [loading, setLoading] = useState(false);

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
        `/register?action=complete&rs=${encodeURIComponent(encodedEmail)}`
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
          step === "verification" || step === "complete" ? "hidden" : ""
        }>
        {" "}
        <VerifyEmail />
      </div>

      {step === "verification" && (
        <Verification
          loading={loading}
          verifyCode={handleCodeVerification}
          setLoading={setLoading}
        />
      )}
    </section>
  );
}
