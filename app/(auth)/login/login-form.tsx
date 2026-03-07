"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { authenticateUserLogin } from "@/lib/actions/auth";
import { validateRecaptcha } from "@/lib/actions/captcha";
import { getCookie } from "@/lib/cookie";
import { type LoginFormData, loginSchema } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import type { FormStatus } from "@/types";
import { PasswordField } from "@/components/forms/password-input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [status, setStatus] = useState<FormStatus>("pending");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [originUrl, setOriginUrl] = useState("/");
  //useEffect to read the cookie
  useEffect(() => {
    setOriginUrl(getCookie("post_login_redirect"));
    // delete the cookie
    document.cookie = "post_login_redirect=; Max-Age=0; path=/; SameSite=Lax";
  }, []);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // function to login
  async function handleSubmit(data: LoginFormData) {
    if (!token || !(await validateRecaptcha(token))) {
      toast.error("Kindly complete the reCAPTCHA challenge");
      return;
    }
    setStatus("loading");
    try {
      const response = await authenticateUserLogin(data.email, data.password);

      if (!response.success) {
        if (response.field) {
          form.setError(response.field as "email" | "password", {
            type: "manual",
            message: response.message,
          });
        }
        if (response.redirect) {
          setTimeout(() => {
            router.replace(response.redirect!);
          }, 100);
        }
        toast.error(response.message);
        setStatus("error");
        return;
      } else {
        toast.success(response.message);
        setStatus("success");
        router.replace(originUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unexpected error occurred");
      setStatus("error");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-4 sm:p-6"
              onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-muted-foreground">
                    Welcome Back
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
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
                          disabled={status === "loading"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <PasswordField
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    disabled={status === "loading"}
                  />
                  <Link
                    href="/password/reset"
                    className="text-sm underline-offset-2 underline text-muted-foreground hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>

                <GoogleReCaptcha
                  onVerify={(token) => {
                    setToken(token);
                  }}
                />

                <Button
                  type="submit"
                  className="w-full hover:bg-blue-500 hover:text-white"
                  disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 has-[>svg]:px-3 bg-blue-200/40 dark:bg-blue-950/50 ">
                  <Mail /> Sign in with Magic Link
                </button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background  px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <GoogleAuthButton
                    setStatus={setStatus}
                    origin_url={originUrl}
                  />
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
