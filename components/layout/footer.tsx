import { BookOpen } from "lucide-react";

import Link from "next/link";
import { ThemeToggle } from "../custom/theme-toggle";
import { FacebookRect, GithubIcon, TwitterXLine } from "@/assets/icons";

const Footer = () => {
  return (
    <footer className="bg-accent/20 text-muted-foreground dark:bg-gray-900 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center space-x-1">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-sm">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 via-purple-500 dark:from-cyan-400 dark:to-blue-400 focus:outline-none">
                Techtales.
              </h1>
            </Link>
            <p className="max-w-md text-sm">
              Your go-to source for the latest in technology, web development,
              and digital innovation. Join our community of developers and tech
              enthusiasts.{" "}
              <span className="inline-block">
                Built with{" "}
                <Link
                  href="https://nextjs.org/"
                  target="_blank"
                  className="text-blue-500 hover:underline font-medium">
                  Next Js
                </Link>{" "}
                ❤️ by Donvine
              </span>
            </p>

            <div className="flex space-x-4 items-center justify-center sm:justify-start ">
              <Link
                href="https://www.facebook.com"
                target="_blank"
                title="facebook"
                prefetch={false}
                referrerPolicy="no-referrer">
                <FacebookRect className="text-blue-600 dark:text-white font-bold cursor-pointer h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/Donvine254"
                className="transition-colors"
                title="github"
                prefetch={false}
                target="_blank"
                referrerPolicy="no-referrer">
                <GithubIcon className=" text-black dark:text-white cursor-pointer h-6 w-6" />
              </Link>
              <Link
                href="https://x.com/diamonddegesh"
                prefetch={false}
                target="_blank"
                referrerPolicy="no-referrer"
                className=" transition-colors"
                title="twitter/x">
                <TwitterXLine className="font-bold text-black dark:text-white cursor-pointer h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-start">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm ">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Donvine254/Tech-Tales-Client/discussions/2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Feature Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-start">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/api"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/docs"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Docs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t  border-gray-200 dark:border-gray-700 mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className=" text-center sm:text-left">
            &copy; {new Date().getFullYear()} Tech Tales. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
