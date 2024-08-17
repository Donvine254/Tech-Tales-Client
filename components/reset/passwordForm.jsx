import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/lib";
import axios from "axios";
import { validateRecaptcha } from "@/lib/actions";
import toast from "react-hot-toast";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "../ui/Loader";
import PasswordStrengthMeter from "../alerts/passwordMeter";
import { Tooltip } from "react-tooltip";
import { generatePassword } from "@/lib/utils";

export default function PasswordForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = atob(decodeURIComponent(searchParams.get("rs")));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setError("Passwords do not match");
      } else {
        setError(false);
      }
    }
  };
  //function to suggest password
  const handleSuggestPassword = () => {
    const password = generatePassword();
    setData((prevData) => ({
      ...prevData,
      password: password,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const isValid = await validateRecaptcha(token);
      if (isValid && email) {
        await axios.patch(`${baseUrl}/auth/reset`, {
          email: email,
          password: data.password,
        });
        toast.success("Password reset successfully");
        setLoading(false);
        router.push("/login");
      } else toast.error("Failed to validate reCAPTCHA response");
    } catch (error) {
      setError(error.response?.data?.error);
      setLoading(false);
    }
  }
  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 md:px-6 font-crimson ">
        <div className="border bg-gray-50 w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="flex gap-2 text-blue-500 items-center justify-center py-1 mt-2">
            <hr className="border border-blue-200 w-1/3" />
            <svg viewBox="0 0 24 24" fill="currentColor" height="60" width="60">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M18 8h2a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h2V7a6 6 0 1112 0v1zm-2 0V7a4 4 0 10-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z" />
            </svg>
            <hr className="border border-blue-200 w-1/3" />
          </div>
          {/* start of form */}
          <form onSubmit={handleSubmit}>
            <div className="px-6">
              <h3 className="font-semibold tracking-tight text-xl  text-center">
                Choose New Password
              </h3>
              <p className="text-sm xsm:text-[12px] my-1 text-center font-extralight">
                Almost done. Enter a new password and you&apos;re all set!
              </p>
              <div className="space-y-2">
                <label
                  className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  htmlFor="password">
                  New Password
                </label>
                <input
                  className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-[999] ${
                    error ? "border-red-500 bg-red-100" : ""
                  }`}
                  id="password"
                  name="password"
                  placeholder="*******"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  title="Password must contain at least one letter and one number, and be at least 8 characters long."
                  value={data.password}
                  onChange={handleChange}
                  disabled={loading}
                  minLength={8}
                  required
                  type={showPassword ? "text" : "password"}
                />
              </div>
              <div className="space-y-1">
                <label
                  className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-[999] ${
                    error ? "border-red-500 bg-red-100" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="*******"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  title="Password must contain at least one letter and one number, and be at least 8 characters long."
                  value={data.confirmPassword}
                  minLength={8}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  type={showPassword ? "text" : "password"}
                />
              </div>
              <div className="flex items-center justify-between gap-2 my-1">
                <div>
                  <input
                    type="checkbox"
                    className="z-50"
                    value={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span> {showPassword ? "Hide" : "Show"} Password</span>
                </div>
                <span
                  className="text-blue-500 underline cursor-pointer"
                  data-tooltip-id="suggest-password"
                  onClick={handleSuggestPassword}>
                  <Tooltip
                    content="click here to suggest a strong password"
                    id="suggest-password"
                    variant="info"
                    style={{ padding: "2px", fontSize: "12px" }}
                  />
                  Suggest Password
                </span>
              </div>
              <PasswordStrengthMeter password={data.password} />
              <div className="h-5 min-h-5 max-h-5 space-y-1">
                {error ? (
                  <p className="text-orange-600 inline-flex place-items-center items-center text-xs w-full gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="12"
                      width="12">
                      <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                      <path d="M21.707 7.293l-5-5A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707zM20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z" />
                    </svg>
                    <span>{error}</span>
                  </p>
                ) : (
                  data.confirmPassword !== "" &&
                  data.confirmPassword === data.password && (
                    <p className="text-green-500 inline-flex place-items-center items-center text-xs w-full gap-3">
                      <svg
                        fill="none"
                        viewBox="0 0 15 15"
                        height="12"
                        width="12">
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
              <button
                className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-blue-500 text-white rounded-md h-10 py-1.5 mb-4 !z-50"
                type="submit"
                disabled={error || loading}
                title="reset">
                {loading ? <Loader size={30} /> : "Reset Password"}
              </button>
            </div>
            <GoogleReCaptcha
              onVerify={(token) => {
                setToken(token);
              }}
            />
          </form>
          <div className="px-6 text-base text-center py-2 bg-cyan-100 border-t-2 border-cyan-500 text-gray-600 ">
            Remember Password?{" "}
            <a className="text-blue-500 hover:underline " href="login">
              Login Here
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
