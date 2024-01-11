"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, handleLogin, saveUserData } from "@/lib";
import { ErrorList } from "@/components/ErrorList";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import Loader from "@/components/Loader";
import { GithubIcon, GoogleIcon } from "@/assets";
import secureLocalStorage from "react-secure-storage";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

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
    setLoading(true);
    handleLogin(loginData, setLoading, setErrors, router);
  }

  //functions to handle Login with google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginGoogleUsers(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
      setErrors(error);
    },
  });

  async function loginGoogleUsers(access_token) {
    const user = await getUserData(access_token);
    if (user) {
      try {
        const response = await fetch(
          `https://techtales.up.railway.app/users?email=${user.email}`
        );
        const data = await response.json();
        if (!data) {
          secureLocalStorage.setItem("unauthorized_user", user);
          toast.error("No user with a matching email was found!", {
            icon: "⚠️",
          });
          router.replace(
            "/login/account_not_found?referrer=https://accounts.google.com/o/oauth2/v2/auth"
          );
        } else {
          saveUserData(data);
          toast.success("Logged in successfully!");
          router.push("/featured");
        }
      } catch (error) {
        console.error(error);
        setErrors(error?.response?.data?.errors);
        toast.error(
          "No account with your email address was found. Register instead",
          {
            icon: "⚠️",
          }
        );
        router.push("register");
      }
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
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 font-poppins">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-4 font-poppins relative">
            <h3 className="font-semibold tracking-tight text-2xl text-center">
              Login to Your Account
            </h3>
            <p className="text-base  text-center">
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
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
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
              <div className="flex items-center justify-start gap-1 md:gap-4">
                <input
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span> {!showPassword ? "Show" : "Hide"} Password</span>
              </div>
              <div>
                <a
                  className="hover:text-blue-500 underline underline-offset-2 cursor-pointer"
                  href="/reset">
                  Forgot Password?
                </a>
              </div>
            </div>
            {errors && <ErrorList errors={errors} />}
          </div>

          <div className="items-center p-6 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black  h-10 px-4 py-2 w-full bg-blue-500 text-white rounded-md"
              type="submit"
              disabled={loading}
              title="login">
              {loading ? <Loader size={30} /> : "Sign in"}
            </button>
            {/* beginning of social logins */}
            <button
              className="rounded-md text-base font-medium  border  hover:bg-gray-200  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={handleGoogleLogin}>
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
            <button
              className="rounded-md text-base font-medium  border  hover:bg-gray-200  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={handleGithubLogin}>
              <GithubIcon />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>
        <div className="mt-6 text-gray-600">
          Not a member?{" "}
          <a className="text-blue-500 hover:underline" href="register">
            Register Here
          </a>
        </div>
      </div>
    </form>
  );
}
