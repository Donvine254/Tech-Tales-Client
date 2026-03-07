// app/checkpoint/magic-link/page.tsx
"use client";
import { CheckCircle2, CircleX, Clock, MoveLeft, ShieldX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type ErrorStatus =
  | "error-token"
  | "error-expired"
  | "error-suspended"
  | "error-deactivated"
  | "error-server";
type Status = "success" | ErrorStatus;

const ERROR_CONFIG: Record<
  ErrorStatus,
  {
    title: string;
    message: string;
    icon: "token" | "expired" | "shield";
    action: { label: string; href: string };
  }
> = {
  "error-token": {
    title: "Invalid Login Link",
    message:
      "This login link is invalid or has already been used. Please request a new magic link to continue.",
    icon: "token",
    action: { label: "Request New Link", href: "/magic-link" },
  },
  "error-expired": {
    title: "Link Expired",
    message:
      "This login link has expired. Magic links are only valid for 15 minutes. Please request a new one.",
    icon: "expired",
    action: { label: "Request New Link", href: "/magic-link" },
  },
  "error-suspended": {
    title: "Account Suspended",
    message:
      "Your account has been suspended. Please contact support to resolve this.",
    icon: "shield",
    action: { label: "Contact Support", href: "/contact" },
  },
  "error-deactivated": {
    title: "Account Deactivated",
    message:
      "Your account has been deleted. Check your email for instructions on how to restore it.",
    icon: "shield",
    action: { label: "Contact Support", href: "/contact" },
  },
  "error-server": {
    title: "Something Went Wrong",
    message:
      "We encountered an unexpected error. Please try again or contact support if the issue persists.",
    icon: "token",
    action: { label: "Try Again", href: "/magic-link" },
  },
};

export default function MagicLinkResultPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as ErrorStatus | null;

  // No error param means the API route redirected here after success
  // But since our API route redirects to "/" on success, this page
  // is only ever shown for errors. Keep a success state for safety.
  const status: Status = error ?? "success";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-muted">
      <div className="w-full max-w-md">
        {status === "success" ? (
          <SuccessCard />
        ) : (
          <ErrorCard status={status as ErrorStatus} />
        )}
      </div>
    </div>
  );
}

function SuccessCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
        <CheckCircle2
          className="text-green-500 size-20 animate-scale-in"
          strokeWidth={1}
          aria-hidden="true"
        />
        <h1 className="text-2xl font-semibold text-green-600 dark:text-green-400">
          Logged In Successfully
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          You have been logged in successfully. Redirecting you now...
        </p>
        <Link href="/">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <MoveLeft className="mr-2 h-4 w-4 animate-move" />
            Go to Homepage
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <p className="text-center text-xs text-muted-foreground mt-4">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
            Contact support
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

function ErrorCard({ status }: { status: ErrorStatus }) {
  const config = ERROR_CONFIG[status];

  const IconComponent = {
    token: (
      <CircleX
        className="text-red-500 size-20 animate-bounce"
        strokeWidth={1}
      />
    ),
    expired: (
      <Clock
        className="text-amber-500 size-20 animate-bounce"
        strokeWidth={1}
      />
    ),
    shield: (
      <ShieldX
        className="text-red-500 size-20 animate-bounce"
        strokeWidth={1}
      />
    ),
  }[config.icon];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
        {IconComponent}
        <h1 className="text-2xl font-semibold text-destructive">
          {config.title}
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          {config.message}
        </p>
        <Link href={config.action.href} className="w-full">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <MoveLeft className="mr-2 h-4 w-4 animate-move" />
            {config.action.label}
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <p className="text-center text-xs text-muted-foreground mt-4">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
            Contact support
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
