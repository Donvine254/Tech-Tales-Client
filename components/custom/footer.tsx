import { BookOpen } from "lucide-react";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Footer = () => {
  return (
    <footer className="bg-accent/20 text-muted-foreground dark:bg-gray-900 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Tech Tales</h2>
            </div>
            <p className=" mb-6 max-w-md">
              Your go-to source for the latest in technology, web development,
              and digital innovation. Join our community of developers and tech
              enthusiasts.{" "}
              <span className="inline-block">
                Built with{" "}
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  className="text-blue-500 hover:underline font-medium">
                  Next Js
                </a>{" "}
                ❤️ by Donvine
              </span>
            </p>

            <div className="flex space-x-4 items-center justify-center sm:justify-start">
              <Link
                href="https://www.facebook.com"
                className=""
                target="_blank">
                <svg
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  height="1.5rem"
                  width="1.5rem"
                  className="text-blue-600 font-bold cursor-pointer h-6 w-6">
                  <title>Facebook</title>
                  <path d="M400 32H48A48 48 0 000 80v352a48 48 0 0048 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0048-48V80a48 48 0 00-48-48z" />
                </svg>
              </Link>
              <a
                href="https://github.com/Donvine254"
                className="transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  width="1.5rem"
                  height="1.5rem"
                  className="font-bold text-black dark:text-white cursor-pointer h-6 w-6">
                  <title>Github</title>
                  <path
                    fill="currentColor"
                    d="M12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031a12.35 12.35 0 0 1 4.449 4.422l.031.058a12.2 12.2 0 0 1 1.654 6.166c0 5.406-3.483 10-8.327 11.658l-.087.026a.72.72 0 0 1-.642-.113l.002.001a.62.62 0 0 1-.208-.466v-.014v.001l.008-1.226q.008-1.178.008-2.154a2.84 2.84 0 0 0-.833-2.274a11 11 0 0 0 1.718-.305l-.076.017a6.5 6.5 0 0 0 1.537-.642l-.031.017a4.5 4.5 0 0 0 1.292-1.058l.006-.007a4.9 4.9 0 0 0 .84-1.645l.009-.035a7.9 7.9 0 0 0 .329-2.281l-.001-.136v.007l.001-.072a4.73 4.73 0 0 0-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479a4.25 4.25 0 0 0-.404-1.814l.011.026a2.1 2.1 0 0 0-1.31.181l.012-.005a8.6 8.6 0 0 0-1.512.726l.038-.022l-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433a9 9 0 0 0-1.272-.595l-.066-.022A2.17 2.17 0 0 0 5.837 5.1l.013-.002a4.2 4.2 0 0 0-.393 1.788c0 .531.097 1.04.275 1.509l-.01-.029a4.72 4.72 0 0 0-1.265 3.303v-.004l-.001.13c0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013a4.4 4.4 0 0 0 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012a3 3 0 0 1-.699.236l-.021.004c-.256.051-.549.08-.85.08h-.066h.003a1.9 1.9 0 0 1-1.055-.348l.006.004a2.84 2.84 0 0 1-.881-.986l-.007-.015a2.6 2.6 0 0 0-.768-.827l-.009-.006a2.3 2.3 0 0 0-.776-.38l-.016-.004l-.32-.048a1.05 1.05 0 0 0-.471.074l.007-.003q-.128.072-.08.184q.058.128.145.225l-.001-.001q.092.108.205.19l.003.002l.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024l.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007q.069.002.15.002q.392 0 .767-.062l-.027.004l.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001a.72.72 0 0 1-.645.111l.005.001C3.486 22.286.006 17.692.006 12.285c0-2.268.612-4.393 1.681-6.219l-.032.058a12.35 12.35 0 0 1 4.422-4.449l.058-.031a11.9 11.9 0 0 1 6.073-1.645h.098h-.005zm-7.64 17.666q.048-.112-.112-.192q-.16-.048-.208.032q-.048.112.112.192q.144.096.208-.032m.497.545q.112-.08-.032-.256q-.16-.144-.256-.048q-.112.08.032.256q.159.157.256.047zm.48.72q.144-.112 0-.304q-.128-.208-.272-.096q-.144.08 0 .288t.272.112m.672.673q.128-.128-.064-.304q-.192-.192-.32-.048q-.144.128.064.304q.192.192.32.044zm.913.4q.048-.176-.208-.256q-.24-.064-.304.112t.208.24q.24.097.304-.096m1.009.08q0-.208-.272-.176q-.256 0-.256.176q0 .208.272.176q.256.001.256-.175zm.929-.16q-.032-.176-.288-.144q-.256.048-.224.24t.288.128t.225-.224z"></path>
                </svg>
              </a>
              <a
                href="https://x.com/diamonddegesh"
                target="_blank"
                className=" transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1.5rem"
                  height="1.5rem"
                  className="font-bold text-black dark:text-white cursor-pointer h-6 w-6">
                  <title>Twitter/X</title>
                  <path
                    fill="currentColor"
                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center sm:text-start">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 ">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Donvine254/Tech-Tales-Client/discussions/2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Feature Requests
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-start">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 ">
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/api"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  API
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="hover:text-blue-500 hover:underline transition-colors">
                  Docs
                </a>
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
