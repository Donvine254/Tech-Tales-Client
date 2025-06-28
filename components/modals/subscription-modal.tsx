"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
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

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button variant="outline">Subscribe <span className="hidden sm:block">to Newsletter</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md container">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-cyan-600" />
                        Subscribe to Newsletter
                    </DialogTitle>
                    <DialogDescription >
                        Stay updated with the latest tech stories, insights, and community highlights.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <ul className="space-y-3 text-xs sm:text-sm mb-4">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 shrink-0">✔</span>
                            <span>Inclusive tech stories from real people, not algorithms.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 shrink-0">✔</span>
                            <span>Diverse voices and perspectives in tech.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 shrink-0">✔</span>
                            <span>Insightful, well-written content that respects your time.</span>
                        </li>
                    </ul>

                    <div className="flex items-center gap-4">
                        <label htmlFor="email" className="sr-only">Email</label>
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
                            className="">
                            <span className="relative z-10">Subscribe</span>
                        </Button>
                    </div>
                </form>
                <div className="text-xs text-muted-foreground max-w-sm text-center">
                    By subscribing, you agree to our{" "}
                    <Link
                        href="/terms"
                        target="_blank"
                        className="text-blue-500 hover:underline"
                    >
                        Terms and Conditions
                    </Link>
                    . You can unsubscribe at any time.
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionModal;