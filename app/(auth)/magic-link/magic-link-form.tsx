"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import GithubButton from "@/components/auth/github";
import GoogleAuthButton from "@/components/auth/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validateRecaptcha } from "@/lib/actions/captcha";
import { type MagicLinkLoginForm, MagicLinkSchema } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import type { FormStatus } from "@/types";
import { sendMagicLink } from "@/lib/actions/magic-link";

export default function MagicLinkForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [status, setStatus] = useState<FormStatus>("pending");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const form = useForm<MagicLinkLoginForm>({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  // function to send magic link login
  async function handleSubmit(data: MagicLinkLoginForm) {
    if (!token || !(await validateRecaptcha(token))) {
      toast.error("Kindly complete the reCAPTCHA challenge");
      return;
    }
    setStatus("loading");
    try {
      const res = await sendMagicLink(data.email);
      if (res.success) {
        setStatus("success");
        toast.success(res.message, {
          position: "top-center",
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const e = error as Error;
      console.error("Magic Link error:", error);
      setStatus("error");
      toast.error(e.message || "Error sending magic link");
    }
  }
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-4 sm:p-6"
              onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-muted-foreground">
                    Magic Link
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email to receive a magic link
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          disabled={
                            status === "loading" || status === "success"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <GoogleReCaptcha
                  onVerify={(token) => {
                    setToken(token);
                  }}
                />

                <Button
                  type="submit"
                  className="w-full hover:bg-blue-500 hover:text-white"
                  disabled={status === "loading" || status === "success"}>
                  {status === "loading" ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Send magic link"
                  )}
                </Button>
                <Link href="/login" passHref>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full bg-accent/20 dark:bg-accent/20">
                    <LockIcon className="w-4 h-4" />
                    Sign in with password
                  </Button>
                </Link>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background  px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <GoogleAuthButton setStatus={setStatus} origin_url="login" />
                  <GithubButton router={router} setStatus={setStatus} />
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
                <div className="text-center">
                  <Button
                    variant="link"
                    type="button"
                    className="text-muted-foreground hover:text-blue-500 p-0 h-auto font-normal"
                    onClick={handleGoBack}>
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Go back
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1751137332/tech-tales/cover-images/qfqaw8mowlxahcucceg4.webp"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover brightness-[0.8] bg-blend-darken dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
