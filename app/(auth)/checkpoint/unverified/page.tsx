"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validateEmail } from "@/lib/utils";
import { Input } from "@/components/ui/input";
type ResendStatus = "idle" | "loading" | "success" | "error";

export default function VerifyEmail() {
  const [status, setStatus] = useState<ResendStatus>("idle");
  const [countdown, setCountdown] = useState(0);
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

  const form = useForm<{
    email: string;
  }>({
    resolver: zodResolver(
      z.object({
        email: z.string().min(1, "Email is required").refine(validateEmail, {
          message: "Please enter a valid email address",
        }),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: { email: string }) => {
    setStatus("loading");
    console.log("Submitting email:", data.email);
    try {
      //TODO: Implement email resending Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Verification email sent!");
      setStatus("success");
      setCountdown(60);
    } catch (error) {
      const e = error as Error;
      console.error("Resend error:", error);
      toast.error(e.message || "Failed to resend email");
      setStatus("error");
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };
  const canResend = countdown === 0 && status !== "loading";
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
                  <h1 className="text-2xl font-bold mb-3">
                    Email not verified
                  </h1>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 text-center">
                    <p className="text-xs sm:text-sm">
                      Verify your email address to access your account. If you
                      don&apos;t see the email, check your spam folder.
                    </p>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              disabled={status === "loading"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canResend}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Sending...
                        </>
                      ) : countdown > 0 ? (
                        `Resend in ${countdown}s`
                      ) : (
                        "Resend Verification Email"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm text-muted-foreground space-y-2">
                  <Button
                    onClick={handleGoToLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                  <p>
                    Wrong email address?{" "}
                    <Link
                      href="/register"
                      className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
                      Sign Up Instead
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
    </div>
  );
}
