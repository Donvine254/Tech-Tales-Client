import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Verify from "./verif";
import { baseUrl } from "@/lib";
import axios from "axios";

import toast from "react-hot-toast";

export default function Verification() {
  const [code, setCode] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = atob(decodeURIComponent(searchParams.get("verify")));

  async function handleSubmit(e) {
    e.preventDefault();
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
    <Verify
      code={code}
      setCode={setCode}
      email={email}
      handleSubmit={handleSubmit}
    />
  );
}
