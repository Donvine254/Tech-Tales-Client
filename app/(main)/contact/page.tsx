import { Mail } from "lucide-react";
import { Metadata } from "next";

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
    </div>
  );
}
