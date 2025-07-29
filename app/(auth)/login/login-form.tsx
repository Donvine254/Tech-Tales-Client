"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { MetaIcon } from "@/assets/icons";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { validateRecaptcha } from "@/lib/actions/captcha";
import GoogleAuthButton from "@/components/auth/google";
import { authenticateUserLogin } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import GithubButton from "@/components/auth/github";
import { FormStatus } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { type LoginFormData, loginSchema } from "@/lib/schemas/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [status, setStatus] = useState<FormStatus>("pending");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [originUrl, setOriginUrl] = useState("/");
  const [showPassword, setShowPassword] = useState(false);
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
      // Get IP address from external API
      const ip = await fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => data.ip);
      const response = await authenticateUserLogin(
        data.email,
        data.password,
        ip
      );

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
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/password/reset"
                          className="ml-auto text-sm underline-offset-2 hover:underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            disabled={status === "loading"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground">
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
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
                  disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Login"
                  )}
                </Button>
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
