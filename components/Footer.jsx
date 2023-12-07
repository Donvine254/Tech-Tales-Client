"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="max-w-7xl w-full mx-auto m-5 p-4 divide-blue-500 font-poppins text-xl">
      <h1 className="p-2 px-4">
        <span className=" md:text-xl font-bold">Tech Tales</span> - An inclusive
        social network blog for software developers
      </h1>
      <div className="flex flex-col md:justify-between md:flex-row align-center md:gap-2">
        <Link
          href="https://www.youtube.com/howyoutubeworks/policies/community-guidelines"
          className="navigation__footer"
          target="_blank">
          Community Guidelines
        </Link>
        <Link
          href="https://policies.google.com/privacy?hl=en"
          target="_blank"
          className="navigation__footer">
          Privacy Policy
        </Link>
        <Link href="" className="navigation__footer">
          Terms of Use
        </Link>
      </div>
      <hr className="border-2 shadow" />
      <div className="flex justify-between align-center mt-2">
        <h1 className="text-xl">&copy; 2023 Tech Tales</h1>
        <div className="flex gap-2">
          <FaFacebookF className="md:text-xl text-blue-950 " />
          <FaTwitter className="md:text-xl  text-blue-950 " />
          <FaGithub className="md:text-xl" />
          <FaYoutube className="md:text-xl text-red-600" />
        </div>
      </div>
    </footer>
  );
}
