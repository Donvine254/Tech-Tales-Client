"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
export default function SubscribeModal() {
  const [error, setError] = useState(null);
  function closeModal() {
    const modal = document.getElementById("subscription_form");
    if (modal) {
      modal.classList.remove("show");
      sessionStorage.setItem("subscription_form_status", true);
      setTimeout(() => modal.close(), 100000);
    }
  }

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
    setError(null);
    const email = e.target.elements.email.value;
    //send confirmation email
    toast.success("You are in the inner circle!");
    e.target.reset();
    closeModal();
    sessionStorage.setItem("subscription_form_status", true);
  }
  return (
    <dialog
      id="subscription_form"
      className="backdrop-blur-sm backdrop-blue-500 rounded-md font-segoi  max-w-md ">
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
        className="hover:fill-red-500 hover:bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50 absolute top-0 right-0"
        onClick={closeModal}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
        <title>Close</title>
      </svg>
      <div className="px-2 py-1 bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 text-white space-y-2">
        <h1 className="font-bold xsm:text-base text-xl md:text-2xl lg:text-3xl text-center ">
          Join our Newsletter
        </h1>
        <p className="text-sm md:text-base  md:text-center leading-loose">
          Stay ahead on the latest updates and <br /> be the first to know when
          we post a new blog.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="my-4 p-2 space-y-4">
        <section id="benefits">
          <ul className="subscribe-form">
            <li>Exclusive content delivered to your inbox</li>
            <li>Early access to new features and blogs</li>
            <li>No spam and you can unsubscribe any time</li>
          </ul>
        </section>
        <section className="bg-[#f8f9fa] rounded-md p-6">
          <input
            type="email"
            name="email"
            id="email"
            onInput={handleInput}
            placeholder="Enter your email address *"
            maxLength={100}
            minLength={6}
            title="Email address must be a valid email address"
            required
            className=" disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2  border  focus:border-blue-500 rounded-md outline-none w-full invalid:border-red-500"
          />
          <p
            className={`text-red-500 text-sm  ${
              error ? "visible opacity-100" : "invisible opacity-0"
            }`}>
            * Please enter a valid email address
          </p>
          <button
            className="px-4 py-1 bg-gradient-to-r mt-2  from-green-400 via-cyan-400 to-indigo-400 text-white disabled:opacity-50 rounded-md  w-full"
            title="subscribe"
            disabled={error}>
            Subscribe Now
          </button>
        </section>
        <div className="py-1 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
            className="fill-gray-400">
            <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
          </svg>
          <p className="text-xs text-gray-500">
            {" "}
            By subscribing you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-cyan-600"
              title="terms">
              terms and conditions.
            </Link>
            &nbsp;We value your privacy and we will never spam you or sell your
            information.
          </p>
        </div>
      </form>
    </dialog>
  );
}

export const SubscribeButton = () => (
  <button
    onClick={() => {
      const modal = document.getElementById("subscription_form");
      if (modal) {
        modal.classList.add("show");
        modal.showModal();
      }
    }}
    className="py-1 my-2 px-4 rounded-md bg-gray-700 text-white text-center hover:bg-green-400 w-1/2 ">
    Subscribe
  </button>
);
