"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle2, CircleX, MoveLeft } from "lucide-react";
import Loading from "./loading";
import { VerifyEmail } from "@/lib/actions/auth";
import { toast } from "sonner";

type Status = "loading" | "success" | "error-token" | "error-server";
export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error-token");
      return;
    }
    const verify = async () => {
      try {
        const res = await VerifyEmail(token);
        if (res.success) {
          setStatus("success");
          toast.success(res.message);
        } else {
          setStatus(res.error as Status);
          toast.error(res.message);
        }
      } catch {
        setStatus("error-server");
      }
    };
    verify();
  }, [token]);

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-muted">
      <div className="w-full max-w-md">
        {status === "success" && <SuccessCard />}
        {(status === "error-token" || status === "error-server") && (
          <ErrorCard status={status} />
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
          Email Verified
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          Your email has been verified successfully. You can now continue to log
          in with your existing credentials.
        </p>
        <Link href="/login">
          <Button className="w-full min-w-full bg-blue-500 hover:bg-blue-600 text-white">
            <MoveLeft className="mr-2 h-4 w-4 animate-move" />
            Continue to Login
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <div className="text-center text-xs text-muted-foreground mt-4">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
            Contact support
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

function ErrorCard({ status }: { status: "error-token" | "error-server" }) {
  const isTokenError = status === "error-token";
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
        <CircleX
          className="text-red-500 size-20 animate-bounce"
          strokeWidth={1}
        />
        <h1 className="text-2xl font-semibold text-destructive">
          {isTokenError ? "Invalid or Expired Link" : "Verification Failed"}
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          {isTokenError
            ? "The verification link is either invalid or has expired. Please resend a new link to continue."
            : "We were unable to restore your account. Please try again after a short while or create a new account."}
        </p>
        <Link href="/checkpoint/unverified">
          <Button className="w-full">
            <MoveLeft className="mr-2 h-4 w-4 animate-move hover:bg-blue-500 hover:text-white" />
            Resend Link
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <div className="text-center text-xs text-muted-foreground mt-4">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
            Contact support
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
