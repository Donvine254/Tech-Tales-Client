import { Badge } from "@/components/ui/badge";
import { baseUrl } from "@/lib/utils";
import { ComputerIcon } from "lucide-react";
import ApiDocs from "./ApiDocs";

export const metadata = {
  title: "API Documentation - Tech Tales",
};

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      {/* Hero Section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
                <ComputerIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-lg md:mb-4 md:text-2xl lg:text-3xl font-bold mb-6">
              API Documentation
            </h1>
            <div className="flex items-center justify-center gap-3">
              <Badge variant="category" className="uppercase text-xl">
                v1
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {baseUrl}/api/v1
              </span>
            </div>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
              The TechTales REST API lets you programmatically access blogs,
              search content, and manage your account. All endpoints return
              JSON.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: March 01, 2026
            </p>
          </div>
        </div>
      </section>
      <section className="min-h-screen bg-background">
        <ApiDocs />
      </section>
    </div>
  );
}
