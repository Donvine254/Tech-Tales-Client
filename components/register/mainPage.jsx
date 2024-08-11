"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, registerUser, saveUserData, baseUrl } from "@/lib";
import { convertToHandle, createUserAvatar } from "@/lib/utils";
import Script from "next/script";
import { useGoogleLogin } from "@react-oauth/google";
import { GithubIcon, GoogleIcon } from "@/assets";
import { validateRecaptcha } from "@/lib/actions";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import Axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import Image from "next/image";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      registerUser(formData, setLoading, router, setError);
    } else {
      toast.error("Recaptcha Validation failed");
    }
  }
  //function to register users with google
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      registerGoogleUsers(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
      setError(error);
    },
  });

  //function to register google users
  async function registerGoogleUsers(access_token) {
    const user = await getUserData(access_token);
    if (user) {
      try {
        const response = await Axios.post(`${baseUrl}/auth/register`, user);
        const data = response.data;
        saveUserData(data);
        setLoading(false);
        toast.success("Registration successful");
        router.replace("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Registration Failed!");
        setError(error?.response?.data?.errors);
      }
    }
  }
  //function to register users with Github
  function handleGithubRegistration() {
    router.push(
      "https://github.com/login/oauth/authorize?client_id=2384921712f034fd32cf"
    );
    toast.success("processing request");
  }
  return (
    <form className="w-full my-4 register-form" onSubmit={handleSubmit}>
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 font-crimson  backdrop-blur-md">
        <div
          className="border  w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex gap-2 text-blue-500 items-center justify-center py-1 mt-2 ">
            <hr className="border border-blue-200 w-1/3" />
            <svg viewBox="0 0 512 512" fill="#3b82f6" height="60" width="60">
              <path d="M399 384.2c-22.1-38.4-63.6-64.2-111-64.2h-64c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zm-256 16c39.8 0 72-32.2 72-72s-32.2-72-72-72-72 32.2-72 72 32.2 72 72 72z" />
            </svg>
            <hr className="border border-blue-200 w-1/3" />
          </div>
          <div className="flex flex-col space-y-2 px-6 py-2 font-poppins">
            <h3 className="font-semibold tracking-tight text-xl md:text-2xl text-center">
              Welcome on Board!
            </h3>
            <p className="text-sm text-center">
              Create a new account to access personalized settings and content.
            </p>
          </div>
          {/* beginning of input div */}
          <div className="px-6 pt-1 space-y-1.5 group">
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Enter Your Email Address
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
                type="email"
              />
            </div>
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
              className="inline-flex items-center justify-center disabled:pointer-events-none hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-gray-100 disabled:text-black border"
              type="submit"
              disabled={loading}
              title="register">
              {loading ? <Loader /> : "Continue"}
            </button>
            <div className="flex items-center gap-2 w-full ">
              <hr className="border border-gray-200 w-full" />
              <div className="text-sm flex-1 w-fit whitespace-nowrap">Or</div>
              <hr className="border border-gray-200 w-full" />
            </div>
            <button
              className="rounded-md   border hover:bg-black hover:text-white h-10 px-4 py-2 w-full flex justify-center items-center space-x-2 disabled:pointer-events-none disabled:opacity-50 "
              disabled={loading}
              type="button"
              onClick={handleGoogleSignup}>
              <GoogleIcon />
              <span>Sign up with Google</span>
            </button>
            <button
              className="rounded-md   border    h-10 px-4 py-2 w-full flex justify-center items-center space-x-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-black hover:text-white"
              type="button"
              disabled={loading}
              onClick={handleGithubRegistration}>
              <GithubIcon />
              <span>Sign up with GitHub</span>
            </button>
          </div>
        </div>
        <div className="px-6 text-base text-center py-2 bg-cyan-100 border-t-2 border-cyan-500 text-gray-600">
          Already a Member?{" "}
          <a className="text-blue-500 hover:underline" href="/login">
            Login Here
          </a>
        </div>
      </div>
    </form>
  );
}
