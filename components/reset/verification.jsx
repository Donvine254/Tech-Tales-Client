import React, { useState, useEffect } from "react";
import CodeInput from "../CodeInput";
import Loader from "../Loader";
import { resendOTPEmail } from "@/lib/actions";
import { useSearchParams } from "next/navigation";

export default function Verification({ verifyCode, loading, setLoading }) {
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");

  const searchParams = useSearchParams();
  const email = atob(decodeURIComponent(searchParams.get("rs")));

  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 120;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isResendDisabled]);

  async function handleResend() {
    setLoading(true);
    setIsResendDisabled(true);
    setTimer(120);
    try {
      if (!email) {
        toast.error("Email address is required");
        setResending(false);
        return;
      }
      const response = await resendOTPEmail(email);
      toast.success("Verification code resent to your email!");
      setResending(false);
    } catch (error) {
      console.error(error);
      setResending(false);
      setError(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    verifyCode(code, email, setError);
  }

  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 md:px-6 font-crimson bg-gray-50">
        <div className="border w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="flex gap-2 text-green-400 items-center justify-center py-1 mt-2">
            <hr className="border border-green-200 w-1/3" />
            <svg viewBox="0 0 24 24" fill="currentColor" height="60" width="60">
              <path d="M13 19c0-3.31 2.69-6 6-6 1.1 0 2.12.3 3 .81V6a2 2 0 00-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h9.09c-.05-.33-.09-.66-.09-1M4 8V6l8 5 8-5v2l-8 5-8-5m13.75 14.16l-2.75-3L16.16 18l1.59 1.59L21.34 16l1.16 1.41-4.75 4.75" />
            </svg>
            <hr className="border border-green-200 w-1/3" />
          </div>
          {/* start of form */}
          <form onSubmit={handleSubmit} id="verify-token">
            <div className="px-6">
              <h1 className="font-bold">Check Your Email</h1>
              <div className="space-y-4 py-2">
                <label
                  className="text-base xms:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-extralight"
                  htmlFor="email">
                  Enter the code we just sent to your email address
                </label>
                <CodeInput setCode={setCode} loading={loading} />
              </div>
              <p className="text-sm text-center">
                {" "}
                {isResendDisabled ? (
                  `Didn't receive the code? Resend in ${timer} seconds`
                ) : (
                  <span>
                    Didn&apos;t receive the code?
                    <span className="text-blue-500" onClick={handleResend}>
                      Resend code
                    </span>
                  </span>
                )}
              </p>
              <div className="h-5 min-h-5 max-h-5">
                {error ? (
                  <p className="text-orange-600 text-sm  ">
                    <span>{error}</span>
                  </p>
                ) : null}
              </div>
              <button
                className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-blue-500 text-white rounded-md h-10 py-1.5 my-2 mb-4"
                type="submit"
                disabled={loading}
                title="reset">
                {loading ? <Loader size={30} /> : "Verify"}
              </button>
            </div>
            <div
              id="information"
              className="bg-green-100 border-t border-green-500 flex items-center gap-1 p-2 text-sm">
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em">
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <p> If you cannot see the code, kindly check the spam folder</p>
            </div>
          </form>
          {/* end of form */}
        </div>
        <div className="mt-2 text-gray-600 text-base">
          Remember Password?{" "}
          <a
            className="text-blue-500 hover:underline border px-2 py-0.5"
            href="login">
            Login Here
          </a>
        </div>
      </div>
    </section>
  );
}
