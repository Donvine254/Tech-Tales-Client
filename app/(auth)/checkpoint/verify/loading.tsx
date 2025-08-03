"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Loading() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = Math.floor((now - start) / 1000);
      setElapsed(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-svh px-4">
      <Card className="w-full max-w-sm shadow-md rounded-xl p-0">
        <CardHeader className="items-center p-4 space-y-2">
          {/* Custom Tech Tales Logo */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent focus:outline-none">
                  Techtales.
                </h1>
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            One last step to become part of the Techtales family. Please hold on
            as we verify your email address.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between w-full">
            {/* first child */}
            <div className="h-20 w-20 rounded-full shadow shadow-gray-400 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="2.5rem"
                height="2.5rem"
                className="h-16 w-16 fill-green-500">
                <path
                  fill="oklch(72.3% 0.219 149.579)"
                  d="M85.944 20.189H14.056a2.56 2.56 0 0 0-2.556 2.557v5.144c0 .237.257.509.467.619l37.786 21.583a.63.63 0 0 0 .318.083a.63.63 0 0 0 .324-.088L87.039 28.53c.206-.115.752-.419.957-.559c.248-.169.504-.322.504-.625v-4.601a2.56 2.56 0 0 0-2.556-2.556m2.237 15.457a.64.64 0 0 0-.645.004L66.799 47.851a.637.637 0 0 0-.145.985l20.74 22.357a.63.63 0 0 0 .467.204a.64.64 0 0 0 .639-.639V36.201a.64.64 0 0 0-.319-.555M60.823 51.948a.636.636 0 0 0-.791-.118l-8.312 4.891a3.24 3.24 0 0 1-3.208.021l-7.315-4.179a.64.64 0 0 0-.751.086L12.668 78.415a.64.64 0 0 0 .114 1.02c.432.254.849.375 1.273.375h71.153a.64.64 0 0 0 .585-.385a.64.64 0 0 0-.118-.689zm-26.489-2.347a.64.64 0 0 0-.115-1.023L12.453 36.146a.638.638 0 0 0-.953.556v32.62a.637.637 0 0 0 1.073.468z"></path>
              </svg>
            </div>
            {/* second child */}
            <div className="flex items-center flex-1">
              <hr className="border border-gray-500 dark:border-gray-300 border-dotted  w-full" />
              <div className="w-fit whitespace-nowrap ">
                <svg fill="none" viewBox="0 0 15 15" height="30" width="30">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    className="text-green-500"
                    d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr className="border border-gray-500 dark:border-gray-300 border-dotted w-full" />
            </div>
            {/* third child */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1 shadow shadow-gray-400 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3 p-3">
            <div className="w-12 h-12 border-3 text-green-700 text-4xl animate-spin border-primary flex items-center justify-center border-t-green-700 rounded-full"></div>
            <p className="text-muted-foreground text-sm">
              Verifying Email Address...
            </p>
            <p className="text-muted-foreground text-sm">{elapsed} seconds</p>
          </div>
          {elapsed > 60 && (
            <div className="text-center text-xs ">
              <span className="text-destructive">This taking too long? </span>
              {""}
              <Link
                href="/checkpoint/unverified"
                className="hover:text-blue-500 underline underline-offset-4">
                Resend Email
              </Link>
            </div>
          )}
        </CardContent>

        <CardFooter className="items-center justify-center p-0 py-3 rounded-b-md bg-blue-500 dark:bg-blue-900/40">
          <div className="text-center text-xs text-white ">
            Need help?{" "}
            <Link
              href="/contact"
              className="hover:text-blue-500 underline underline-offset-4">
              Contact support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
