"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib";
import Script from "next/script";
import { useGoogleLogin } from "@react-oauth/google";
import secureLocalStorage from "react-secure-storage";
import { GithubIcon, GoogleIcon } from "@/assets";
import axiosInstance from "@/axiosConfig";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    registerUser(formData, setLoading, navigate);
  }
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserInfo(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
    },
  });
  const getUserInfo = async (accessToken) => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = await response.json();
    const user = {
      username: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      password: accessToken,
    };
    try {
      const response = await axiosInstance.post(
        "https://techtales.up.railway.app/login",
        user
      );
      const data = response.data;
      setSuccess(true);
      setErrors(null);
      const expiresAt = new Date().getTime() + 8 * 60 * 60 * 1000; //8hrs
      if (typeof window !== "undefined") {
        secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
        secureLocalStorage.setItem(
          "session_expiry_time__",
          JSON.stringify(expiresAt)
        );
      }
      setLoading(false);
      navigate.replace("/featured");
    } catch (error) {
      setLoading(false);
      setErrors(error?.response?.data?.errors);
      setSuccess(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 font-crimson  backdrop-blur-md">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 pt-2 font-poppins">
            <h3 className="font-semibold tracking-tight text-2xl text-center">
              Get Started Today!
            </h3>
            <p className="text-base  text-center">
              Create a new account to access personalized settings and content.
            </p>
          </div>
          <div className="px-6 pt-1 space-y-4">
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="username">
                Username
              </label>
              <input
                className="flex h-10 bg-background text-base ring-offset-background file:border-0  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="username"
                name="username"
                placeholder="john doe"
                value={formData.username}
                onChange={handleChange}
                required
                type="text"
                pattern="^(?!.*@).*"
                title="Email addresses are not allowed as usernames."
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Email
              </label>
              <input
                className="flex h-10 bg-background text-base ring-offset-background file:border-0  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
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
                className="flex h-10 bg-background text-base ring-offset-background file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="password"
                name="password"
                placeholder="*******"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="flex items-center justify-start gap-4">
              <input
                type="checkbox"
                value={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span> {showPassword ? "Hide" : "Show"} Password</span>
            </div>
          </div>

          <div className="items-center p-6 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white rounded-md"
              type="submit"
              disabled={loading}
              title="register">
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4335 4335"
                  width="30"
                  className="animate-spin mr-3"
                  height="30">
                  <path
                    fill="#ffffff"
                    d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
                  />
                </svg>
              ) : (
                "Sign up"
              )}
            </button>
            <button
              className="rounded-md text-base font-medium  border   hover:bg-gray-200 h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={handleGoogleSignup}>
              <GoogleIcon />
              <span>Sign up with Google</span>
            </button>
            <button
              className="rounded-md text-base font-medium  border   hover:bg-gray-200 h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={() =>
                toast("This feature is not supported yet!", {
                  icon: "😢",
                  position: "bottom-center",
                })
              }>
              <GithubIcon />
              <span>Sign up with GitHub</span>
            </button>
            <div
              className="bg-orange-100 border border-orange-500 text-orange-600 py-3 rounded relative space-y-2 border-l-4 "
              role="alert">
              <div className="flex  px-1 ">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-orange-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    By continuing, you agree to our Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-gray-600 text-xl">
          Alreay a member?{" "}
          <a className="text-blue-500 hover:underline" href="/login">
            Login
          </a>
        </div>
      </div>
    </form>
  );
}
