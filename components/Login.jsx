"use client";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlLogin } from "react-icons/sl";
import { useRouter } from "next/navigation";
import axiosInstance from "../axiosConfig";
const loginApi = "https://techtales.up.railway.app/login";
import toast from "react-hot-toast";

export default function useLogin() {
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
        navigate.replace("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid email or password. Kindly recheck and try again");
    }
  }
  return (
    <div
      id="login-parent-div"
      className="font-poppins px-2 flex-1 lg:max-w-[75%] lg:mx-auto">
      <div id="logo-div" className="">
        <Link href="/">
          <h1 className="text-2xl m-5 text-center md:text-left md:text-3xl font-bold font-poppins lg:text-4xl cursor-pointer">
            Tech Tales{" "}
            <span className="text-red-600 text-2xl md:text-5xl">.</span>
          </h1>
        </Link>
      </div>
      <div className="w-full flex h-screen flex-col items-center justify-center">
        <form
          className="p-4 w-full md:w-3/4 lg:w-1/2 max-w-lg  border text-xl rounded-md min-w-[300px] min-h-[450px] lg:min-h-[500px] bg-[#f4f3f2] shadow-md"
          onSubmit={handleLogin}>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Welcome Back
          </h1>
          <div className="relative">
            <label htmlFor="email">Email: </label>
            <br></br>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Type your email"
              className="input-field focus:bg-blue-200 focus:border-2 focus:border-blue-500"
              required
            />
            <MdEmail id="email-icon" />
          </div>
          <div className="relative">
            <label htmlFor="password">Password :</label>
            <br></br>
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Type your password"
              minLength={8}
              required
              className="input-field focus:bg-blue-200 focus:border-2 focus:border-blue-500 "
            />
            <FaLock id="password-icon" />
          </div>
          <input
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <span> {!showPassword ? "Show" : "Hide"} Password</span>
          <p className="pt-3">
            Forgot Password?{" "}
            <Link href="/reset" className="login__link">
              {" "}
              Click here
            </Link>
          </p>
          <button type="submit" className="login-button">
            <SlLogin /> Login
          </button>
          <div className="py-2">
            <p className="">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="hover:text-blue-500 font-bold underline">
                signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
