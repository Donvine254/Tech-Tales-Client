"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authenticateUser, getUserData, handleLogin } from "@/lib";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import Loader from "@/components/ui/Loader";
import { GithubIcon, GoogleIcon } from "@/assets";
import { validateRecaptcha } from "@/lib/actions";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("post_login_redirect_url") ?? "relevant";

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
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
      handleLogin(loginData, setLoading, setError, router, redirect);
    } else {
      setLoading(false);
      toast.error("Recaptcha Validation Failed");
    }
  }

  //functions to handle Login with google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginGoogleUsers(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
      setError(error);
    },
  });

  async function loginGoogleUsers(access_token) {
    const user = await getUserData(access_token);
    if (user) {
      authenticateUser(user, router, "accounts.google.com");
    }
  }
  //function to handle GitHub Login
  function handleGithubLogin() {
    router.push(
      "https://github.com/login/oauth/authorize?client_id=2384921712f034fd32cf"
    );
    toast.success("processing request");
  }

  return (
    <form className="w-full login-form" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 font-poppins">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-4 font-poppins relative">
            <h3 className="font-semibold tracking-tight text-xl md:text-2xl text-center">
              Welcome Back
            </h3>
            <p className="xsm:text-sm text-base  text-center">
              Access your personalized settings and content.
            </p>
          </div>
          <div className="px-6 space-y-2">
            <div className="space-y-2 group">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Email
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password">
                Password
              </label>
              <input
                className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
                id="password"
                name="password"
                placeholder="*******"
                value={loginData.password}
                onChange={handleChange}
                minLength={8}
                disabled={loading}
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="xsm:text-sm flex items-center justify-between gap-1 md:gap-4">
              <div className="flex items-center justify-start gap-1 md:gap-2">
                <input
                  type="checkbox"
                  className="z-50"
                  value={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span> {!showPassword ? "Show" : "Hide"} Password</span>
              </div>
              <div>
                <a
                  className="hover:text-blue-500 underline underline-offset-2 cursor-pointer z-50"
                  href="/reset">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
          {error && (
            <div className="px-6">
              <p className="text-red-500 text-base"> *{error}</p>
            </div>
          )}
          <div className="items-center px-6 py-2 pb-4 flex flex-col space-y-2">
            <GoogleReCaptcha
              onVerify={(token) => {
                setToken(token);
              }}
            />
            <button
              className="inline-flex items-center justify-center  border disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black  h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md z-50"
              type="submit"
              disabled={loading}
              title="login">
              {loading ? <Loader size={30} /> : "Login"}
            </button>
            {/* beginning of social logins */}
            <div className="flex items-center gap-2 w-full ">
              <hr className="border border-gray-200 w-full" />
              <div className="text-sm flex-1 w-fit whitespace-nowrap">Or</div>
              <hr className="border border-gray-200 w-full" />
            </div>
            <button
              className="rounded-md font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2 z-50"
              type="button"
              onClick={handleGoogleLogin}>
              <GoogleIcon />
              <span>Login with Google</span>
            </button>
            <button
              className="rounded-md font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2 z-50"
              type="button"
              onClick={handleGithubLogin}>
              <GithubIcon />
              <span>Login with Github</span>
            </button>
          </div>
          <div className="px-6 text-base text-center py-2 bg-cyan-100 border-t-2 border-cyan-500 text-gray-600">
            Don&apos;t have an account?{" "}
            <a className="text-blue-500 hover:underline z-50" href="register">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
