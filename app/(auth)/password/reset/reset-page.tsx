"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/lib/cookie";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import GithubButton from "@/components/auth/github";
import GoogleAuthButton from "@/components/auth/google";
import { MetaIcon } from "@/assets/icons";
import { toast } from "sonner";
import { FormStatus } from "@/types";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateEmail } from "@/lib/utils";
import { z } from "zod";
import { Loader2, MailIcon } from "lucide-react";
import { validateRecaptcha } from "@/lib/actions/captcha";
import { handlePasswordResetRequest } from "@/lib/actions/auth";
import SuccessDialog from "@/components/modals/success-dialog";

export default function ResetPassword() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [originUrl, setOriginUrl] = useState("/");
  const router = useRouter();

  useEffect(() => {
    setOriginUrl(getCookie("post_login_redirect"));
    document.cookie = "post_login_redirect=; Max-Age=0; path=/; SameSite=Lax";
  }, []);

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
    if (!token || !(await validateRecaptcha(token))) {
      toast.error("Kindly complete the reCAPTCHA challenge");
      return;
    }
    setStatus("loading");
    const res = await handlePasswordResetRequest(data.email);
    setStatus("success");
    if (!res.success) {
      form.setError("email", {
        type: "manual",
        message: res.message,
      });
      toast.error(res.message);
    } else {
      setIsOpen(true);
      form.reset();
    }
  };
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-muted">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-36 h-36 ">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753468871/illustrations/ovwtxpksafk2zlqlxvk0.webp"
                      alt="Password illustration"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <h1 className="text-2xl font-semibold mb-2">
                    Reset Your Password
                  </h1>
                  <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1">
                    <p className="text-xs sm:text-sm">
                      Enter your email and we will send you a verification code
                      to reset your password.
                    </p>
                  </div>
                </div>
                {/* Form */}
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
                            <div className="relative">
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email address"
                                className="pl-8 py-2"
                              />
                              <MailIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={status === "loading"}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                </Form>

                <GoogleReCaptcha
                  onVerify={(token) => {
                    setToken(token);
                  }}
                />

                {/* Social Auth */}
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background  px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <GoogleAuthButton
                    setStatus={setStatus}
                    origin_url={originUrl}
                  />
                  <GithubButton router={router} setStatus={setStatus} />
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full hover:bg-blue-100 dark:hover:bg-white "
                    title="login with meta"
                    onClick={() => {
                      toast.info("upcoming feature!");
                    }}>
                    <MetaIcon />
                    <span className="sr-only">Login with Meta</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-balance text-center text-xs text-muted-foreground mt-4">
          Need help? Contact our{" "}
          <Link
            href="/contact"
            className="hover:text-blue-500 underline underline-offset-4">
            support team
          </Link>
        </div>
      </div>
      <SuccessDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => router.push("/login")}
        title="Email Sent Successfully"
        description={`We have sent password reset instructions to ${form.getValues(
          "email"
        )}. Kindly check your email to reset your password.`}
      />
    </div>
  );
}
