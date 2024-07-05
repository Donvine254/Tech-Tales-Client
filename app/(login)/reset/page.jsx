"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function ResetPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
    try {
      await Axios.patch("https://techtales.up.railway.app/reset", resetForm);
      toast.success("Password reset successfully");
      setLoading(false);
      push("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.errors ?? "something went wrong");
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <form className="w-full" onSubmit={handleReset}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 font-crimson">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white "
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-2 font-poppins">
            <h3 className="font-semibold tracking-tight text-2xl text-center">
              Reset Your Password
            </h3>
            <p className="text-base  text-center">
              Unlock your account to access your personalized settings and
              content.
            </p>
          </div>
          <div className="px-6 space-y-1.5">
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Email
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
                id="password"
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
          <p className="text-orange-600 flex items-center gap-2 text-base px-6  ">
            {error && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <span>Passwords do not match</span>
              </>
            )}
          </p>
          <div className="items-center px-6 py-4 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4 py-1.5 w-full bg-blue-500 text-white rounded-md"
              type="submit"
              disabled={loading || error}
              title="reset">
              {loading ? <Loader size={30} /> : "Reset Password"}
            </button>
            <div
              className="bg-teal-100 border border-teal-500 text-teal-600 py-3 rounded relative space-y-2 border-l-4 "
              role="alert">
              <div className="flex  px-1 ">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Use password manager!</p>
                  <p className="text-sm">
                    To help you remember your password and login with one click.
                  </p>
                </div>
              </div>
            </div>
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
