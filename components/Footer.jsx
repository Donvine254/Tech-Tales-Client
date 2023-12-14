"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-7xl w-full mx-auto m-5 p-4 divide-blue-500 font-poppins text-xl">
      <h1 className="p-2 px-4">
        <span className=" md:text-xl font-bold">Tech Tales</span>
        <span className="xsm:text-sm">
          - An inclusive social network blog for software developers
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
        <h1 className="text-xl">&copy; 2023 Tech Tales</h1>
        <div className="flex items-center gap-2">
          <Link
            href="https://www.facebook.com"
            className="navigation__footer"
            target="_blank">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="30"
              className="md:text-xl text-blue-600 font-bold">
              <path
                fill="currentColor"
                d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z"
              />
            </svg>
          </Link>
          <Link
            href="https://www.twitter.com"
            className="navigation__footer"
            target="_blank">
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
              className="md:text-2xl text-blue-500 fill-blue-500">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </Link>
          <Link
            href="https://github.com/Donvine254"
            className="navigation__footer"
            target="_blank">
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
              className="md:text-2xl">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
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
