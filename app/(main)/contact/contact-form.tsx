"use client";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactForm } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import SuccessDialog from "@/components/modals/success-dialog";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "c0376663-dd70-4ab4-ba1b-e849ba57eecc",
        username: data.username,
        email: data.email,
        message: data.message,
        from_name: "Techtales",
        subject: "You have a new message at Techtales.",
      }),
    });
    const result = await response.json();
    setIsSubmitting(false);
    if (result.success) {
      setShowDialog(true);
      form.reset();
    } else {
      toast.error("Something unexpected happened, try again later");
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="my-2">Send us a message</CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <input type="checkbox" name="botcheck" id="" className="hidden" />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        required
                        minLength={2}
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                        minLength={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what's on your mind..."
                        className="min-h-[120px]"
                        required
                        minLength={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <SuccessDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        title="Message sent successfully"
        description="We have received your message. We'll get back to you as soon as possible."
      />
    </>
  );
}
