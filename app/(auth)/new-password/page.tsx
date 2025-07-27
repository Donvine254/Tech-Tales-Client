"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleX, Eye, EyeOff, Loader2, MoveLeft, Wand2 } from "lucide-react";
import { simplePasswordRegex } from "@/lib/schemas/auth";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormStatus } from "@/types";
import PasswordStrengthMeter from "@/components/pages/settings/password-strength";
import { generatePassword } from "@/lib/utils";
import { toast } from "sonner";
import { validateRecaptcha } from "@/lib/actions/captcha";
import SuccessDialog from "@/components/modals/success-dialog";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(simplePasswordRegex, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<FormStatus>("pending");
  const [token, setToken] = useState<string | null>(null); //recaptcha token
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const auth_token = searchParams.get("token");
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const handleSuggestPassword = () => {
    const suggestedPassword = generatePassword();
    form.setValue("password", suggestedPassword);
    form.setValue("confirmPassword", suggestedPassword);
    setShowPassword(true);

    // Copy to clipboard
    navigator.clipboard.writeText(suggestedPassword).then(() => {
      toast.info("Password copied to clipboard!");
    });
  };
  async function handleSubmit(data: { password: string }) {
    console.log(data);
    if (!token || !(await validateRecaptcha(token))) {
      toast.error("Kindly complete the reCAPTCHA challenge");
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setIsOpen(true);
  }
  if (!auth_token) {
    return <ErrorState />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-muted">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="p-4 sm:p-6 w-full">
              <div className="flex gap-2 text-muted-foreground items-center justify-center py-1 mt-2">
                <hr className="border border-border w-1/3" />
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="60"
                  width="60">
                  <path d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 008-8 8 8 0 00-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77 1.53 0 2.78 1.24 2.78 2.77v1.01m-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37z" />
                </svg>
                <hr className="border border-border w-1/3" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold mb-2">
                    Change Your Password
                  </h1>
                  <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1">
                    <p className="text-xs sm:text-sm">
                      Almost set. Enter a new password below to change your
                      password.
                    </p>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}>
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between space-x-2 items-center">
                            <FormLabel>Confirm Password</FormLabel>
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
                          <FormMessage />
                          <PasswordStrengthMeter
                            password={form.getValues("password")}
                          />
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
                      className="w-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      disabled={status === "loading"}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4" />
                          <span>Processing..</span>
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-auth-blue hover:text-auth-blue-hover underline underline-offset-4">
            Contact support
          </Link>
        </div>
      </div>
      <SuccessDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => router.push("/login")}
        title="Password updated successfully"
        description={`Your password has been changed. Kindly proceed to login with your new password.`}
      />
    </div>
  );
}

const ErrorState = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-muted">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
            <CircleX
              className="text-red-500 size-20 animate-scale-in"
              strokeWidth={1}
              aria-hidden="true"
            />

            <h1 className="text-2xl font-semibold text-destructive">
              Link Expired
            </h1>

            <p className="text-sm text-muted-foreground">
              To reset your password, go back to the login page and choose
              <span className="font-medium text-foreground">
                {" "}
                &quot;Reset Password&quot;
              </span>{" "}
              to receive a new link.
            </p>

            <Link href="/reset" passHref>
              <Button
                variant="outline"
                className="mt-2 w-full"
                aria-label="Go to reset password page">
                <MoveLeft className="mr-2 h-4 w-4 animate-move" />
                Reset Password
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
      </div>
    </div>
  );
};
