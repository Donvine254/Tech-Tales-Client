"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axiosConfig";
const loginApi = "https://techtales.up.railway.app/login";
import toast from "react-hot-toast";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(loginApi, loginData);
      const data = response.data;
      if (data.error) {
        // If the response contains an error message
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: data.error,
          showCloseButton: true,
          showCancelButton: true,
        });
      } else {
        // If the response contains user data (login successful)
        const foundUser = data;
        console.log(foundUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        }
        toast.success("Logged in successfully!");
        navigate.push("/featured");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid email or password. Kindly recheck and try again");
    }
  }
  return (
    <form className="w-full" onSubmit={handleLogin}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 font-crimson">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white hover:scale-110 transition ease-in-out"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 font-poppins">
            <h3 className="font-semibold tracking-tight text-2xl text-center">
              Login to Your Account
            </h3>
            <p className="text-base  text-center">
              Access your personalized settings and content.
            </p>
          </div>
          <div className="px-6 pt-6 space-y-4">
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
                value={loginData.email}
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
                value={loginData.password}
                onChange={handleChange}
                minLength={8}
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="">
              <input
                type="checkbox"
                value={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span> {!showPassword ? "Show" : "Hide"} Password</span>
            </div>
          </div>

          <div className="items-center p-6 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white rounded-md"
              type="submit"
              title="login">
              Sign in
            </button>
            <button
              className="rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-200 hover:text-accent-foreground h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={() =>
                toast("This feature is not supported yet!", {
                  icon: "😢",
                  position: "bottom-center",
                })
              }>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span>Sign in with Google</span>
            </button>
            <button
              className="rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-200 hover:text-accent-foreground h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={() =>
                toast("This feature is not supported yet!", {
                  icon: "😢",
                  position: "bottom-center",
                })
              }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>
        <div className="mt-6 text-gray-600 text-xl">
          Not a member?{" "}
          <a className="text-blue-500 hover:underline" href="register">
            Register
          </a>
        </div>
      </div>
    </form>
  );
}
