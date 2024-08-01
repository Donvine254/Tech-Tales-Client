"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { resetPassword, validateRecaptcha } from "@/lib/actions";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ResetPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetForm = {
    email: formData.email,
    password: formData.password,
  };
  const { push } = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      if (formData.password !== value) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    if (error) {
      toast.error("Kindly make sure the passwords match");
      setLoading(false);
      return;
    }
    if (!token) {
      toast.error("Kindly complete the recaptcha challenge");
      return;
    }

    try {
      const isValid = await validateRecaptcha(token);
      if (isValid) {
        await resetPassword(resetForm);
        toast.success("Password reset successfully");
        setLoading(false);
        push("/login");
      } else toast.error("Failed to validate reCAPTCHA response");
    } catch (error) {
      setLoading(false);
      toast.error(error?.message ?? "something went wrong");
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <form className="w-full" onSubmit={handleReset}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 md:px-6 font-crimson bg-gray-50">
        <div className="border  w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="flex gap-2 items-center justify-center py-1 mt-2">
            <hr className="border border-blue-200 w-1/3" />
            <div className="flex flex-col text-blue-500 items-center p-1 w-14 h-14 rounded-full justify-center border bg-blue-100 ring ring-offset-1 ring-blue-400">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="30"
                width="30">
                <path d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 008-8 8 8 0 00-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77 1.53 0 2.78 1.24 2.78 2.77v1.01m-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37z" />
              </svg>
              <span className="text-xl text-blue-500">****</span>
            </div>
            <hr className="border border-blue-200 w-1/3" />
          </div>
          <div className="flex flex-col space-y-1.5 px-6 py-2 font-poppins">
            <h3 className="font-semibold tracking-tight text-xl  text-center">
              Reset Your Password
            </h3>
            <p className="xsm:text-sm text-base  text-center">
              Unlock your account to access your personalized settings and
              content.
            </p>
          </div>
          <div className="px-6 space-y-1.5">
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Enter Your Email
              </label>
              <input
                className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={FormData.email}
                onChange={handleChange}
                disabled={loading}
                required
                type="email"
              />
            </div>
            {/* beginning of div */}
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password">
                Password
              </label>
              <input
                className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
                  error ? "border-red-500 bg-red-100" : ""
                }`}
                id="password"
                name="password"
                placeholder="*******"
                value={FormData.password}
                onChange={handleChange}
                minLength={8}
                disabled={loading}
                required
                type="password"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password">
                Confirm Password
              </label>
              <input
                className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
                  error ? "border-red-500 bg-red-100" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="*******"
                value={FormData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                disabled={loading}
                required
                type="password"
              />
            </div>
          </div>
          <div className="h-5 min-h-5 max-h-5  px-6">
            {error ? (
              <p className="text-orange-600 inline-flex place-items-center items-center text-sm w-full gap-1 ">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em">
                  <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                  <path d="M21.707 7.293l-5-5A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707zM20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z" />
                </svg>
                <span>Passwords do not match</span>
              </p>
            ) : (
              formData.confirmPassword !== "" &&
              formData.confirmPassword === formData.password && (
                <p className="text-green-500 inline-flex place-items-center items-center text-sm w-full gap-1">
                  <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                    <path
                      stroke="currentColor"
                      strokeLinecap="square"
                      d="M1 7l4.5 4.5L14 3"
                    />
                  </svg>
                  <span>Passwords match</span>
                </p>
              )
            )}
          </div>
          <div className="items-center px-6 pb-4 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4 py-1.5 w-full bg-blue-500 text-white rounded-md h-10"
              type="submit"
              disabled={loading || error}
              title="reset">
              {loading ? <Loader size={30} /> : "Reset Password"}
            </button>
            <GoogleReCaptcha
              onVerify={(token) => {
                setToken(token);
              }}
            />
          </div>
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
    </form>
  );
}

const stepOne = ({ setEmail, email, loading }) => {
  return (
    <form>
      <div className="px-6 space-y-1.5">
        <div className="space-y-2">
          <label
            className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="email">
            Enter Your Email
          </label>
          <input
            className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>
        <div className="items-center px-6 pb-4 flex flex-col space-y-4">
          <button
            className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4 py-1.5 w-full bg-blue-500 text-white rounded-md h-10"
            type="submit"
            title="reset">
            Continue
          </button>
          <GoogleReCaptcha
            onVerify={(token) => {
              setToken(token);
            }}
          />
        </div>
      </div>
    </form>
  );
};

const stepTwo = () => {
  return (
    <form>
      <div className="px-6 space-y-1.5">
        <div className="space-y-2">
          <label
            className="text-base font-bold leading-none text-center peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="code">
            Enter Verification Code{" "}
          </label>
          <input
            className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
            id="code"
            name="code"
            placeholder="****"
            required
            type="text"
          />
        </div>
        <div className="items-center px-6 pb-4 flex flex-col space-y-4">
          <button
            className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4 py-1.5 w-full bg-blue-500 text-white rounded-md h-10"
            type="submit"
            title="verify">
            Verify
          </button>
          <GoogleReCaptcha
            onVerify={(token) => {
              setToken(token);
            }}
          />
        </div>
      </div>
    </form>
  );
};
