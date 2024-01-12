"use client";
import Link from "next/link";
import { Facebook, GithubIcon, Twitter } from "@/assets";
export default function Footer() {
  return (
    <footer className="max-w-7xl w-full mx-auto m-2 p-4 divide-blue-500 font-poppins text-xl">
      <h1 className="p-2 px-4">
        <span className="md:text-xl font-bold">Tech Tales</span>
        <span className="xsm:text-sm">
          &#x2015; An inclusive social network blog for tech enthusiasts and
          professionals
        </span>
      </h1>
      <div className="flex flex-wrap md:justify-between md:flex-row align-center md:gap-2">
        <Link
          href="/community-guidelines"
          className="navigation__footer"
          target="_blank">
          Community Guidelines
        </Link>
        <Link
          href="/privacy-policy"
          target="_blank"
          className="navigation__footer">
          Privacy Policy
        </Link>
        <Link href="/terms" className="navigation__footer">
          Terms of Use
        </Link>
      </div>
      <hr className="border-2 shadow" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-2">
        <h1 className="text-xl">
          &copy; {new Date().getFullYear()} Tech Tales
        </h1>
        <div className="flex items-center space-x-1">
          <Link
            href="https://www.facebook.com"
            className="navigation__footer"
            target="_blank">
            <Facebook />
          </Link>
          <Link
            href="https://www.twitter.com"
            className="navigation__footer"
            target="_blank">
            <Twitter />
          </Link>
          <Link
            href="https://github.com/Donvine254"
            className="navigation__footer"
            target="_blank">
            <GithubIcon />
          </Link>
          <Link
            href="https://youtube.com/tech-tales"
            className="navigation__footer"
            target="_blank">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="26"
              width="26"
              className="md:text-2xl text-red-500 fill-red-500 font-bold">
              <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 00-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 001.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
