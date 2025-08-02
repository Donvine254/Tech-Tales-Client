"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Mail, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { validateEmail } from "@/lib/utils";
import { setCookie } from "@/lib/cookie";
import { Input } from "../ui/input";
const SubscriptionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();

    if (email && validateEmail(email)) {
      toast.success(
        "Thank you for subscribing! Please check your email for confirmation."
      );
      setCookie("subscribed", "true", 30);
      e.currentTarget.reset();
      // Close modal after short delay
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    } else {
      toast.error("Please enter a valid email address.");
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Subscribe <span className="hidden sm:block">to Newsletter</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="space-y-3">
        <AlertDialogTrigger
          className="hover:text-red-500 absolute top-1.5 right-1.5"
          onClick={handleClose}>
          <X className="size-4" />
        </AlertDialogTrigger>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-cyan-600" />
            Subscribe to Newsletter
          </AlertDialogTitle>
          <AlertDialogDescription>
            Stay updated with the latest tech stories, insights, and community
            highlights.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <ul className="space-y-3 text-xs sm:text-sm mb-4">
            <li className="flex items-start gap-2">
              <span className="text-green-600 shrink-0">✔</span>
              <span>
                Inclusive tech stories from real people, not algorithms.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 shrink-0">✔</span>
              <span>Diverse voices and perspectives in tech.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 shrink-0">✔</span>
              <span>
                Insightful, well-written content that respects your time.
              </span>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              autoComplete="email"
              pattern="^[A-Za-z0- 9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
              className=""
              minLength={5}
              required
            />
            <Button
              type="submit"
              className="hover:bg-blue-600 hover:text-white">
              <span className="relative z-10">Subscribe</span>
            </Button>
          </div>
        </form>
        <div className="text-xs text-muted-foreground max-w-sm text-center">
          By subscribing, you agree to our{" "}
          <Link
            href="/terms"
            target="_blank"
            className="text-blue-500 hover:underline">
            Terms and Conditions
          </Link>
          . You can unsubscribe at any time.
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscriptionModal;
