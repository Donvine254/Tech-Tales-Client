"use client";
import { useState } from "react";
import { FaLock, FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Axios from "axios";
import Swal from "sweetalert2";

export default function ResetPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetForm = {
    email: formData.email,
    password: formData.password,
  };
  const { push } = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        html: "<p>⚠️Passwords must match⚠️</p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
      return;
    }
    try {
      const response = await Axios.patch(
        "https://tech-tales.onrender.com/users",
        resetForm
      );
      const data = response.data;
      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Reset Failed!",
          text: "Kindly ensure you have a registered account before resetting your password.",
          showCloseButton: true,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Password reset successfully",
          text: "Proceed to login with your new password",
          timer: 3000,
        });
        push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Reset Failed!",
        text: "An error occurred while resetting the password.",
        showCloseButton: true,
      });
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
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
        <h1 className="text-xl md:text-2xl font-bold text-center py-2">
          Reset Password
        </h1>
        <form className="p4 m3" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email">Email Address: </label>
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
            <label htmlFor="password">New Password :</label>
            <br></br>
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              minLength={8}
              onChange={handleChange}
              required
              className="input-field focus:bg-blue-600"
            />
            <FaLock id="reset-icon" />
            <p className="text-base">Must be at least 8 characters</p>
          </div>
          <div className="relative">
            <label htmlFor="password">Confirm Password :</label>
            <br></br>
            <input
              type={!showPassword ? "password" : "text"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-Type your password"
              minLength={8}
              required
              className="input-field focus:bg-blue-600"
            />
            <FaLock id="reset-icon" />
            <p className="text-base">Both Passwords must match</p>
          </div>
          <input
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <span> {!showPassword ? "Show" : "Hide"} Password</span>
          <button type="submit" className="login-button">
            <FaEdit /> Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
