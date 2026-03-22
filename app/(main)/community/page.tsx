import {
  AlertTriangle,
  Heart,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import GuidelinesCards from "./guidelines";
export const metadata: Metadata = {
  title: "Read our community guideline - Tech Tales",
  description: "Stay updated with the newest stories in the world of tech.",
};

export default function page() {
  const reportingSteps = [
    "Click the report button on the problematic content",
    "Select the appropriate violation category",
    "Provide a brief description of the issue",
    "Our moderation team will review within 24 hours",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-full">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-lg mb-4 md:mb-6 md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50">
              Community Guidelines
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
              Our community thrives when everyone feels safe, respected, and
              valued. These guidelines help us maintain a positive environment
              for learning and sharing.
            </p>
          </div>
        </div>
      </section>
      {/* Core Values */}
      <GuidelinesCards />

      {/* Detailed Guidelines */}
      <section className="bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What We Encourage */}
            <div>
              <h3 className="text-2xl font-bold  mb-6 flex items-center">
                <Heart className="h-6 w-6 text-green-500 mr-3" />
                What We Encourage
              </h3>
              <div className="space-y-4 ">
                <div className="bg-green-100 dark:bg-green-950 p-4 rounded-lg border border-green-300 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Sharing Knowledge
                  </h4>
                  <p className="text-green-700 dark:text-green-200 text-sm">
                    Share your experiences, tutorials, and insights to help
                    others learn and grow.
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-950 p-4 rounded-lg border border-green-300 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Constructive Feedback
                  </h4>
                  <p className="text-green-700 dark:text-green-200 text-sm">
                    Provide helpful, actionable feedback that helps authors
                    improve their content.
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-950 p-4 rounded-lg border border-green-300 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Mentoring
                  </h4>
                  <p className="text-green-700 dark:text-green-200  text-sm">
                    Help newcomers by answering questions and providing
                    guidance.
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-950 p-4 rounded-lg border border-green-300 dark:border-green-800">
                  <h4 className="font-semibold dark:text-green-200 text-green-800 mb-2">
                    Collaboration
                  </h4>
                  <p className="text-green-700 dark:text-green-200 text-sm">
                    Work together on projects and share resources that benefit
                    everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* What We Don't Allow */}
            <div>
              <h3 className="text-2xl font-bold  mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                What We Don&apos;t Allow
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Harassment & Bullying
                  </h4>
                  <p className="text-red-700 dark:text-red-200  text-sm">
                    Any form of harassment, bullying, or intimidation is
                    strictly prohibited.
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Spam & Self-Promotion
                  </h4>
                  <p className="text-red-700 dark:text-red-200 text-sm">
                    Excessive self-promotion, spam, or irrelevant content that
                    doesn&apos;t add value.
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Misinformation
                  </h4>
                  <p className="text-red-700 dark:text-red-200 text-sm">
                    Spreading false information or unverified claims without
                    proper sources.
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Inappropriate Content
                  </h4>
                  <p className="text-red-700 dark:text-red-200 text-sm">
                    Content that is offensive, discriminatory, or not suitable
                    for a professional environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 via-purple-600 p-8 text-white dark:text-muted-foreground dark:from-blue-950 dark:to-cyan-900 dark:via-purple-950 rounded-sm ">
          <div className="text-center mb-4">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Report Violations</h3>
            <p className="text-purple-100 dark:text-muted-foreground max-w-2xl mx-auto">
              Help us maintain a safe community by reporting content that
              violates our guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">How to Report</h4>
              <ol className="space-y-3">
                {reportingSteps.map((step, index) => (
                  <li key={step} className="flex items-start space-x-3">
                    <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-purple-100 dark:text-muted-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">What Happens Next</h4>
              <div className="space-y-3">
                <p className="text-purple-100 dark:text-muted-foreground">
                  Our moderation team reviews all reports carefully and takes
                  appropriate action based on our community guidelines.
                </p>
                <p className="text-purple-100 dark:text-muted-foreground">
                  Responses may include content removal, warnings, temporary
                  suspensions, or permanent bans depending on the severity.
                </p>
                <p className="text-purple-100 dark:text-muted-foreground">
                  We appreciate your help in keeping TechTales a welcoming place
                  for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold dark:text-gray-200  mb-4">
              Questions About Our Guidelines?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto dark:text-gray-200 ">
              If you have questions about our community guidelines or need
              clarification on any policy, we&apos;re here to help.
            </p>

            <a
              href="mailto:support@techtales.vercel.app"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:bg-cyan-700 hover:scale-110 transition-all duration-200">
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
