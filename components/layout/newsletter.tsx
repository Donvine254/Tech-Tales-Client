"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;
export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
  });

  const onSubmit = async () => {
    try {
      // You can replace this with your actual API call
      setSubmitted(true);
      toast.success(
        "Thank you for subscribing, kindly check your email to confirm",
        {
          position: "bottom-center",
        },
      );
      reset();
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };
  return (
    <section className="text-accent-foreground border-t border-border mt-4 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold  mb-4">
            Stay Updated with Techtales
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Get the latest articles, tutorials, and tech insights delivered
            straight to your inbox. Join over 10,000 developers who trust
            TechTales for quality content.
          </p>
          <form
            className="flex flex-col gap-2 w-full space-y-2"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full max-w-md mx-auto">
              <div className="relative grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  disabled={isSubmitting || submitted}
                  placeholder="Enter your email.."
                  autoComplete="email"
                  {...register("email")}
                  className="[&:not(:placeholder-shown):invalid]:border-destructive flex-1 pl-10 pr-4"
                  minLength={5}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || submitted}
                title="Subscribe to our newsletter"
                className="relative ml-2 shrink-0 overflow-hidden rounded-lg text-white 
  transition-all duration-200 hover:scale-105 hover:shadow-lg 
  bg-linear-to-r from-cyan-600 to-blue-600 
  before:absolute before:inset-0 before:-z-10 before:rounded-lg
  before:bg-linear-to-r before:from-cyan-400 before:via-blue-500 before:to-purple-600
  before:opacity-0 before:transition-opacity before:duration-300 
  hover:before:opacity-100 before:animate-[gradient-flow_3s_linear_infinite] 
  cursor-pointer">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            {/* error message for email validation */}
            {errors.email && (
              <p className="text-sm text-red-500 w-full">
                {errors.email.message}
              </p>
            )}
          </form>

          <div
            role="alert"
            className="relative w-full px-4 py-2 grid has-[>svg]:grid-cols-[--spacing(4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-6 gap-y-0.5 [&>svg]:translate-y-0.5 [&>svg]:text-current items-start mt-4 mx-auto max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="1rem"
              height="1rem"
              className="text-blue-500 fill-blue-500 w-8 min-h-8 h-auto self-stretch">
              <title>shield</title>
              <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
            </svg>
            <div className="col-start-2 grid text-start text-balance justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
              <p className="text-xs text-muted-foreground">
                By subscribing you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-blue-600"
                  title="terms">
                  terms and conditions.
                </Link>
                &nbsp;We value your privacy and we will never spam you or sell
                your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
