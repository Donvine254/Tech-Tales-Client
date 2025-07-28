"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { baseUrl } from "@/lib/utils";
import { sendVerificationEmail } from "@/emails/mailer";
import SuccessDialog from "@/components/modals/success-dialog";
type ResendStatus = "idle" | "loading" | "success" | "error";

export default function VerifyEmail({
  email,
  token,
}: {
  token: string;
  email: string | null;
}) {
  const [resendStatus, setResendStatus] = useState<ResendStatus>("idle");
  const [countdown, setCountdown] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email) {
      return null;
    }
    setResendStatus("loading");
    try {
      // Resend the email
      await sendVerificationEmail(email, `${baseUrl}/verify?token=${token}`);
      setIsOpen(true);
      setResendStatus("success");
      setCountdown(60);
    } catch (error) {
      const e = error as Error;
      console.error("Resend error:", error);
      toast.error(e.message || "Failed to resend email");
      setResendStatus("error");
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  if (!email) return null;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-muted">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-36 h-36 md:w-40 md:h-40 ">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1752890127/illustrations/nyaqbwq5aae5etbofsaz.webp"
                      alt="Email verification success"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <h1 className="text-2xl font-bold mb-3">Check your inbox</h1>
                  <div className="text-balance text-xs sm:text-sm text-muted-foreground space-y-1">
                    <p>We&apos;ve sent a verification link to</p>
                    <p className="font-medium text-xs sm:text-sm text-blue-500 break-all">
                      {email}
                    </p>
                    <p className="text-xs sm:text-sm">
                      Click the link in the email to verify your account. If you
                      don&apos;t see the email, check your spam folder.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handleResendEmail}
                      disabled={resendStatus === "loading" || countdown > 0}
                      variant="outline"
                      className="w-full">
                      {resendStatus === "loading" ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Sending...
                        </>
                      ) : countdown > 0 ? (
                        `Resend in ${countdown}s`
                      ) : (
                        "Resend verification email"
                      )}
                    </Button>

                    <Button
                      onClick={handleGoToLogin}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Login
                    </Button>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Wrong email address?{" "}
                    <Link
                      href="/register"
                      className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
                      Try again
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-balance text-center text-xs text-muted-foreground mt-4">
          Need help? Contact our{" "}
          <Link
            href="/contact"
            className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
            support team
          </Link>
        </div>
      </div>
      <SuccessDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Email sent successfully"
        description={`We have resent a verification email to ${email}. Kindly check your email to verify your account.`}
      />
    </div>
  );
}
