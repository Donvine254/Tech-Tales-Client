"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { registerUser } from "@/lib";
import { convertToHandle, createUserAvatar } from "@/lib/utils";
import Script from "next/script";
import { validateRecaptcha } from "@/lib/actions";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import PasswordStrengthMeter from "../alerts/passwordMeter";

export default function CompleteRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(false);
  const searchParams = useSearchParams();
  const email = atob(decodeURIComponent(searchParams.get("rs")));
  const [formData, setFormData] = useState({
    username: "",
    email: email,
    password: "",
    picture: "",
    avatar: "",
  });
  const router = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //function to update username
  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      username: value,
      handle: convertToHandle(value),
      picture: createUserAvatar(value),
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      toast.error("Kindly complete the recaptcha challenge");
      return;
    }
    const isValid = await validateRecaptcha(token);
    if (isValid) {
      setLoading(true);
      setError("");
      registerUser(formData, setLoading, setError);
    } else {
      toast.error("Recaptcha Validation failed");
    }
  }
  return (
    <form className="w-full my-4 register-form" onSubmit={handleSubmit}>
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 font-crimson  backdrop-blur-md">
        <div
          className="border  w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex gap-2 text-green-500 items-center justify-center py-1 mt-2 ">
            <hr className="border border-green-200 w-1/3" />
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="60"
              width="60">
              <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 00-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
            </svg>

            <hr className="border border-green-200 w-1/3" />
          </div>
          <div className="px-6 py-2 ">
            <p className="text-sm text-center">
              Almost done! Choose a unique username and a password and you are
              all set
            </p>
          </div>
          {/* beginning of input div */}
          <div className="px-6 pt-1 space-y-1.5 group">
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="username">
                Username
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
                id="username"
                name="username"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleUsernameChange}
                autoComplete="username"
                pattern="^[a-zA-Z\s]*$"
                title="numbers and special characters are not allowed"
                maxLength={20}
                minLength={3}
                disabled={loading}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password">
                Password
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
                id="password"
                name="password"
                placeholder="*******"
                autoComplete="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                disabled={loading}
                title="Password must contain at least one letter and one number, and be at least 8 characters long."
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="flex items-center justify-start gap-2">
              <input
                type="checkbox"
                className="z-50"
                value={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span> {showPassword ? "Hide" : "Show"} Password</span>
            </div>
            <PasswordStrengthMeter password={formData.password} />
          </div>
          {error && (
            <div className="my-1 px-6">
              <p className="text-sm text-red-500">*{error}</p>
            </div>
          )}
          <div className="items-center px-6 py-2 pb-4 flex flex-col space-y-2">
            <GoogleReCaptcha
              onVerify={(token) => {
                setToken(token);
              }}
            />
            <button
              className="inline-flex items-center justify-center disabled:pointer-events-none hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-gray-100 disabled:text-black border z-50"
              type="submit"
              disabled={loading || !formData.email}
              title="register">
              {loading ? <Loader /> : "Register"}
            </button>
          </div>
          <div className="mb-2 px-6 text-gray-600">
            Already a Member?{" "}
            <a className="text-blue-500 hover:underline z-50" href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
