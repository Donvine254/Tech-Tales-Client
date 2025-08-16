import { buttonVariants } from "@/components/ui/button";
import { CompassIcon, Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "404 Not Found – Page Missing",
  description:
    "Sorry, the page you are looking for could not be found. It may have been moved or deleted.",
};
export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-accent">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-8xl lg:text-9xl font-bold text-gray-300/90 dark:text-gray-500 mb-4 font-sans">
            410
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            This page is no longer here.
          </h2>
          <p className="text-muted-foreground mb-8">
            The author has deleted this blog page. It&apos;s permanently gone and
            can&apos;t be recovered
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/featured"
            className={buttonVariants({
              variant: "outline",
              className: "hover:bg-blue-500 hover:text-white",
            })}>
            <CompassIcon className="mr-2 h-4 w-4" />
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
