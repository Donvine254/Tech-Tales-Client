"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlLogin } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/lib";
import Axios from "axios";
const usersApi = "https://basalt-equatorial-paw.glitch.me/users";

export default function useLogin() {
  const [userData, setUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useRouter();
  //fetch all users and check for the user, with the database, we will need to fetch using the userdata:
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(usersApi);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleLogin(e) {
    e.preventDefault();
    const loginSuccessful = validateLogin(loginData, userData);
    if (loginSuccessful) {
      navigate.replace("/home");
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You will be redirected to the homepage in a few seconds.",
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
        showCloseButton: true,
        showCancelButton: true,
      });
    }
  }
  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl m-5 text-center md:text-left md:text-3xl font-bold lg:text-4xl cursor-pointer">
          Tech Tales{" "}
          <span className="text-red-600 text-2xl md:text-5xl">.</span>
        </h1>
      </div>
      <div className="login-page">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Welcome Back
        </h1>
        <form className="p4 m3" onSubmit={handleLogin}>
          <div className="relative">
            <label htmlFor="email">Email: </label>
            <br></br>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Type your email"
              className="input-field  focus:bg-blue-600"
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
              className="input-field focus:bg-blue-600"
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
            Forgot Password? <a className="login__link"> Click here</a>
          </p>
          <button type="submit" className="login-button">
            <SlLogin /> Login
          </button>
        </form>
        <br></br>
        <div className="shadow-lg border-t-2 p-2 border-t-slate-500">
          <p className="text-center text-xl font-bold">Or</p>
          <Link href="/register" className="login__link">
            <p className="mx-auto text-center">Register Here</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
