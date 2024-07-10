"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, registerUser, saveUserData } from "@/lib";
import Script from "next/script";
import { useGoogleLogin } from "@react-oauth/google";
import { GithubIcon, GoogleIcon } from "@/assets";
import Axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
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
    registerUser(formData, setLoading, router);
  }
  //function to register users with google
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      registerGoogleUsers(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
    },
  });

  //function to register google users
  async function registerGoogleUsers(access_token) {
    const user = await getUserData(access_token);
    if (user) {
      try {
        const response = await Axios.post(
          "https://techtales.up.railway.app/users",
          user
        );
        const data = response.data;
        saveUserData(data);
        setLoading(false);
        toast.success("registration successful");
        router.replace("/relevant");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Registration Failed!");
        toast.error(error?.response?.data?.errors);
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
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 pt-2 font-poppins">
            <h3 className="font-semibold tracking-tight text-xl md:text-2xl text-center">
              Get Started Today!
            </h3>
            <p className="xsm:text-base text-base  text-center">
              Create a new account to access personalized settings and content.
            </p>
          </div>
          <div className="px-6 pt-1 space-y-1.5 group">
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="username">
                Username
              </label>
              <input
                className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="username"
                name="username"
                placeholder="john doe"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
                type="text"
                minLength={3}
                maxLength={20}
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
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password">
                Password
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="password"
                name="password"
                placeholder="*******"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                disabled={loading}
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

          <div className="items-center px-6 py-2 pb-4 flex flex-col space-y-2">
            <button
              className="inline-flex items-center justify-center disabled:pointer-events-none hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-gray-100 disabled:text-black border"
              type="submit"
              disabled={loading}
              title="register">
              {loading ? <Loader /> : "Sign up"}
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
            {/* <div
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
                  <p className="text-xs">
                    By continuing, you agree to our Terms and Conditions.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          Already a Member?{" "}
          <a
            className="text-blue-500 hover:underline border px-2 py-0.5"
            href="/login">
            Login Here
          </a>
        </div>
      </div>
    </form>
  );
}
