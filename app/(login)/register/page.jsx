"use client";
import Link from "next/link";
import { useState } from "react";
import { FaLock, FaUserAlt, FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib";

export default function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
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
    registerUser(formData, navigate);
  }

  return (
    <div className="font poppins">
      <div className="">
        <Link href="/">
          <h1 className="text-2xl m-5 text-center md:text-left md:text-3xl font-bold lg:text-4xl cursor-pointer">
            Tech Tales{" "}
            <span className="text-red-600 text-2xl md:text-5xl">.</span>
          </h1>
        </Link>
      </div>
      <div className="login-page">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Welcome on Board
        </h1>
        <form className="p4 m3" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username">Username: </label>
            <br></br>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              pattern="^(?!.*@).*"
              placeholder="Enter your username"
              className="input-field  focus:bg-blue-600"
              title="Email addresses are not allowed as usernames."
              required
            />
            <FaUserAlt id="email-icon" />
          </div>
          <div className="relative">
            <label htmlFor="email">Email: </label>
            <br></br>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
            By continuing, you agree to the{" "}
            <a className="login__link">Terms and Conditions</a>
          </p>
          <button type="submit" className="login-button">
            <FaEdit /> Register
          </button>
        </form>
        <br></br>
        <div className="shadow-lg border p-2 border-blue-500">
          Already signed up? <br className="hidden lg:block" />
          <Link href="/login" className="login__link">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
