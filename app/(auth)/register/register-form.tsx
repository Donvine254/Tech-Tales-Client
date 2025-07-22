"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Loader2, Wand2 } from "lucide-react";
import { type RegisterFormData, registerSchema } from "@/lib/schemas/auth";
import { useRouter } from "next/navigation";
import { generatePassword } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { MetaIcon } from "@/assets/icons";
import GithubButton from "@/components/auth/github";
import GoogleAuthButton from "@/components/auth/google";
import { getCookie } from "@/lib/cookie";
import { PasswordStrength } from "@/components/auth/password-strength";

type FormStatus = "pending" | "loading" | "success" | "error";

export default function RegisterForm() {
  const [status, setStatus] = useState<FormStatus>("pending");
  const [showPassword, setShowPassword] = useState(false);
  const [originUrl, setOriginUrl] = useState("/");
  const router = useRouter();

  //useEffect to read the cookie
  useEffect(() => {
    setOriginUrl(getCookie("post_login_redirect"));
    document.cookie = "post_login_redirect=; Max-Age=0; path=/; SameSite=Lax";
  }, []);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSuggestPassword = () => {
    const suggestedPassword = generatePassword();
    form.setValue("password", suggestedPassword);
    setShowPassword(true);

    // Copy to clipboard
    navigator.clipboard.writeText(suggestedPassword).then(() => {
      toast.success("Password Copied!");
    });
  };

  const handleSubmit = async (data: RegisterFormData) => {
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Registration successful!", {
        description: "Please check your email to verify your account.",
      });
      setStatus("success");
      // Navigate to verify page with email as query param
      const encodedEmail = btoa(data.email);
      router.push(`/verify-email?token=${encodedEmail}`);
    } catch (error) {
      console.error("Registration error:", error);

      toast.error("Registration failed", {
        description: "Please try again.",
      });

      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full max-w-5xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                className="p-4 sm:p-6"
                onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome onboard</h1>
                    <p className="text-balance text-muted-foreground">
                      Create an account to get started
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="johndoe"
                            id="new-username"
                            autoComplete="off"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            autoComplete="off"
                            id="new-email"
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
                        <div className="flex justify-between space-x-2 items-center">
                          <FormLabel>Password</FormLabel>
                          <button
                            type="button"
                            onClick={handleSuggestPassword}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline  flex items-center space-x-1">
                            <Wand2 className="w-3 h-3" />
                            <span>Suggest password</span>
                          </button>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter a strong password"
                              autoComplete="new-password"
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
                        <PasswordStrength password={field.value} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full hover:bg-blue-500 hover:text-white"
                    disabled={status === "loading"}>
                    {status === "loading" ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      "Create account"
                    )}
                  </Button>

                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
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
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
                      Sign in
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

        <div className="text-balance text-center text-xs text-muted-foreground mt-4 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By creating an account, you agree to our{" "}
          <Link href="/terms">Terms of Service</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
