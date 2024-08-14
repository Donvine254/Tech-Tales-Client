"use client";
import React, { useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { validateRecaptcha } from "@/lib/actions";

export default function ContactForm() {
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleInput = (e) => {
    const emailValue = e.target.value;
    if (emailValue.trim() === "") {
      setError(null);
    } else if (!emailValue.match(pattern)) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      setError("Recaptcha validation failed");
      return;
    }
    const isValid = await validateRecaptcha(token);
    if (!isValid) {
      setError("Recaptcha validation failed");
      return;
    }
    toast.success("Submitting form..");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "c0376663-dd70-4ab4-ba1b-e849ba57eecc",
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
        from_name: "Tech Tales",
        subject: "You have a new message at Tech Tales.",
      }),
    });
    const result = await response.json();
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Message sent successfully",
        text: "Thank you! Your message has been submitted successfully. We will reply to you soon!",
        showCloseButton: true,
        confirmButtonColor: "#0056F1",
        timerProgressBar: true,
        timer: 3000,
        customClass: {
          confirmButton:
            "px-2 py-1 mx-2 rounded-md bg-#0056F1 text-white hover:text-white",
        },
        buttonsStyling: false,
      });
    }
    e.target.reset();
  }
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="border shadow rounded-md bg-gray-50 py-6 px-4 space-y-2 flex-1">
        <h2 className="text-xl font-bold text-center">
          Need More information?
        </h2>
        <p className="text-base text-start">
          Fill up the form below to send us a message and we will get in touch
          as soon as possible.
        </p>
        <input type="checkbox" name="botcheck" id="" className="hidden" />
        <div className="space-y-2">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name">
            Name <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            className="h-10 bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
            id="name"
            type="text"
            name="fullname"
            placeholder="John Doe"
            autoComplete="name"
            pattern="^[a-zA-Z\s]*$"
            title="numbers and special characters are not allowed"
            maxLength={20}
            minLength={3}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email">
            Email <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            className="h-10 bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50 "
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            onInput={handleInput}
            title="enter a valid email address"
            maxLength={60}
            minLength={3}
            required
          />
          <p
            className={`text-red-500 text-sm  ${
              error ? "visible opacity-100" : "invisible opacity-0"
            }`}>
            Please enter a valid email address
          </p>
        </div>
        <div className="space-y-2">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="message">
            Your Message<span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            className=" bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
            rows={3}
            id="message"
            name="message"
            maxLength={500}
            minLength={5}
            required
            placeholder="Tye your message here.."></textarea>
        </div>
        <div className=" flex items-center gap-4 justify-end">
          <button
            type="reset"
            className="h-8 px-4 py-0.5 rounded-md bg-black text-white hover:bg-red-500 border">
            Clear
          </button>
          <button
            type="submit"
            className="disabled:pointer-events-none hover:bg-primary/90 h-8 px-4 py-0.5  bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-gray-100 disabled:text-black border">
            Submit
          </button>
        </div>

        <GoogleReCaptcha
          onVerify={(token) => {
            setToken(token);
          }}
        />
      </form>
    </GoogleReCaptchaProvider>
  );
}
