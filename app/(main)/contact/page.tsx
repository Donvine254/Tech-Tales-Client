import { Bug, Mail, MessageSquare, UserCircle } from "lucide-react";
import { Metadata } from "next";
import ContactForm from "./contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FacebookRect, GithubIcon, TwitterXLine } from "@/assets/icons";
import SubscriptionModal from "@/components/modals/subscription-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Contact Us - Tech Tales",
};

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
                <Mail className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-lg md:mb-4 md:text-2xl lg:text-3xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
              Have a question, suggestion, or just want to say hello? We&apos;d
              love to hear from you. Get in touch with our team and we&apos;ll
              respond as soon as possible.
            </p>
          </div>
        </div>
      </section>
      <main className="bg-background">
        <div className="grid md:grid-cols-2 gap-8 mx-auto px-4 py-12 max-w-6xl ">
          <ContactForm />
          {/* second child */}
          <div className="space-y-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="my-2">Other ways to reach us</CardTitle>
                <CardDescription>
                  Choose the method that works best for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 ">
                <div className="hover:border-blue-600 hover:bg-blue-100 hover:text-blue-900 dark:hover:text-white dark:hover:border-blue-500 dark:hover:bg-blue-900/20 flex items-center gap-3 p-3 rounded-lg border transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Send us an email</p>
                    <a
                      href="mailto:support@techtales.vercel.app"
                      className="hover:text-blue-500 text-sm hover:underline">
                      support@techtales.vercel.app
                    </a>
                  </div>
                </div>
                <div className="hover:border-blue-600 hover:bg-blue-100 hover:text-blue-900 dark:hover:text-white dark:hover:border-blue-500 dark:hover:bg-blue-900/20 flex items-center gap-3 p-3 rounded-lg border transition-colors">
                  <Bug className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Report a bug</p>
                    <a
                      href="https://github.com/Donvine254/Tech-Tales-Client/issues/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 text-sm hover:underline">
                      Found an issue? Let us know on GitHub
                    </a>
                  </div>
                </div>{" "}
                <div className="hover:border-blue-600 hover:bg-blue-100 hover:text-blue-900 dark:hover:text-white dark:hover:border-blue-500 dark:hover:bg-blue-900/20 flex items-center gap-3 p-3 rounded-lg border transition-colors">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Start a discussion</p>
                    <a
                      href="https://github.com/Donvine254/Tech-Tales-Client/discussions/2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 text-sm hover:underline">
                      Join the conversation on GitHub
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-600 ">
              <CardHeader>
                <CardTitle>Follow us</CardTitle>
                <CardDescription>
                  Stay connected with us on social media.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 items-center justify-center sm:justify-start">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border hover:bg-accent transition-colors">
                    <FacebookRect className="text-blue-600 dark:text-white font-bold cursor-pointer h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/Donvine254"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border hover:bg-accent transition-colors"
                    title="Github">
                    <GithubIcon className="font-bold text-black dark:text-white cursor-pointer h-6 w-6" />
                  </a>
                  <a
                    href="https://x.com/diamonddegesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border hover:bg-accent transition-colors"
                    title="Twitter/X">
                    <TwitterXLine className="font-bold text-black dark:text-white cursor-pointer h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* CTA section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 ">
            Join Our Community
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Become part of our growing community of tech enthusiasts. Share your
            stories, learn from others, and stay updated with the latest in
            technology.
          </p>

          {/* Community CTA */}
          <div className="flex flex-row gap-4 justify-center items-center mb-5">
            <Link href="/login" passHref>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                <UserCircle className="h-4 w-4" /> Sign Up
              </Button>{" "}
            </Link>

            <SubscriptionModal />
          </div>
        </div>
      </section>
    </div>
  );
}
