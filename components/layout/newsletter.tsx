"use client";
import { validateEmail } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function Newsletter() {
  return (
    <section className="text-accent-foreground border-t border-border mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold  mb-4">
            Stay Updated with Tech Tales
          </h2>
          <p className="mb-8">
            Get the latest articles, tutorials, and tech insights delivered
            straight to your inbox. Join over 10,000 developers who trust
            TechTales for quality content.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              if (email && validateEmail(email)) {
                toast.success(
                  "Thank you for subscribing! Please check your email for confirmation."
                );
                //reset the form
                e.currentTarget.reset();
              } else {
                toast.error("Please enter a valid email address.");
              }
            }}>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email.."
                name="email"
                autoComplete="email"
                pattern="^[A-Za-z0- 9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                className="[&:not(:placeholder-shown):invalid]:border-destructive flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full bg-white dark:bg-input pl-8 peer"
                minLength={5}
                required
              />{" "}
              <MailIcon className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
            </div>

            <button
              type="submit"
              className="relative px-6 py-3 text-white rounded-lg font-semibold overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:via-blue-500 before:to-purple-600 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:animate-[gradient-flow_3s_linear_infinite] cursor-pointer">
              <span className="relative z-10">Subscribe</span>
            </button>
          </form>
          <div className="py-1 mt-4 flex items-center justify-center gap-1 max-w-sm mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="3.125rem"
              height="3.15rem"
              className="text-blue-500 fill-blue-500">
              <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
            </svg>
            <p className="text-xs text-muted-foreground">
              {" "}
              By subscribing you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-blue-600"
                title="terms">
                terms and conditions.
              </Link>
              &nbsp;We value your privacy and we will never spam you or sell
              your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
