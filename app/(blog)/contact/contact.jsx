"use client";
import React from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import Swal from "sweetalert2";

export default function ContactForm() {
  async function handleSubmit(e) {
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
  return (
    <GoogleReCaptchaProvider>
      <div className="px-2 md:px-8 w-full mx-auto md:my-4 md:w-2/3">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          id="form"
          onSubmit={handleSubmit}
          className="border shadow border-blue-500 rounded-md bg-gray-50 py-6 px-4 space-y-2">
          <h2 className="text-xl font-bold text-center">
            Need More information?
          </h2>
          <p className="text-base text-start">
            Fill up the form below to send us a message and we will get in touch
            as soon as possible.
          </p>
          <input
            type="hidden"
            name="access_key"
            value="c0376663-dd70-4ab4-ba1b-e849ba57eecc"
          />
          <input
            type="hidden"
            name="redirect"
            value="https://techtales.vercel.app/contact"
          />
          <input
            type="hidden"
            name="subject"
            value="You have a new message at techtales.vercel.app"></input>
          <input type="hidden" name="from_name" value="tech tales"></input>
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
              className="h-10 bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
              id="name"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              title="enter a valid email address"
              maxLength={60}
              minLength={3}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="message">
              Your Message<span className="text-red-600 font-bold">*</span>
            </label>
            <textarea
              className=" bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
              rows={2}
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
              className="h-10 px-4 py-0.5 rounded-md bg-black text-white hover:bg-red-500 border">
              Clear
            </button>
            <button
              type="submit"
              className="disabled:pointer-events-none hover:bg-primary/90 h-10 px-4 py-0.5  bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-gray-100 disabled:text-black border">
              Submit
            </button>
          </div>
          <GoogleReCaptcha />
        </form>
      </div>
    </GoogleReCaptchaProvider>
  );
}
