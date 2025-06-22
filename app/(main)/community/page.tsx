import {
  Users,
  Shield,
  Heart,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Latest Posts | Tech Tales",
  description: "Stay updated with the newest stories in the world of tech.",
};

export default function page() {
  const guidelines = [
    {
      icon: Heart,
      title: "Be Respectful",
      description:
        "Treat all community members with kindness and respect. We welcome diverse perspectives and backgrounds.",
      details: [
        "Use inclusive language that welcomes everyone",
        "Avoid personal attacks or harassment",
        "Respect different opinions and viewpoints",
        "Be patient with newcomers and beginners",
      ],
    },
    {
      icon: MessageSquare,
      title: "Stay On Topic",
      description:
        "Keep discussions relevant to technology, development, and the topics covered in our blog.",
      details: [
        "Post content related to tech, programming, or development",
        "Use appropriate categories and tags",
        "Avoid spam or promotional content",
        "Share valuable insights and experiences",
      ],
    },
    {
      icon: Shield,
      title: "No Harmful Content",
      description:
        "We have zero tolerance for content that could harm individuals or the community.",
      details: [
        "No hate speech, discrimination, or harassment",
        "No sharing of malicious code or security exploits",
        "No doxxing or sharing personal information",
        "No content promoting illegal activities",
      ],
    },
    {
      icon: CheckCircle,
      title: "Quality Content",
      description:
        "Contribute meaningful content that adds value to our community discussions.",
      details: [
        "Write clear, well-structured posts and comments",
        "Fact-check information before sharing",
        "Credit sources and provide references",
        "Avoid duplicate or low-effort posts",
      ],
    },
  ];

  const reportingSteps = [
    "Click the report button on the problematic content",
    "Select the appropriate violation category",
    "Provide a brief description of the issue",
    "Our moderation team will review within 24 hours",
  ];

  return (
    <div className="min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-muted/90 dark:bg-gray-900/90">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-lg mb-2 md:mb-4 md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50">
            Community Guidelines
          </h1>
          <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
            Welcome to TechTales! Our community thrives when everyone feels
            safe, respected, and valued. These guidelines help us maintain a
            positive environment for learning and sharing.
          </p>
        </div>
      </section>
      <hr className="border-2 my-2" />
      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="md:text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do in our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guidelines.map((guideline, index) => (
            <div
              key={index}
              className="rounded-lg border bg-accent shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col space-y-1.5 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-3 rounded-full">
                    <guideline.icon className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <h3 className="font-semibold leading-none tracking-tight text-xl ">
                  {guideline.title}
                </h3>
              </div>
              <div className="p-6 pt-0 text-muted-foreground">
                <p className="mb-4">{guideline.description}</p>
                <ul className="space-y-2">
                  {guideline.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Guidelines */}
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What We Encourage */}
            <div>
              <h3 className="text-2xl font-bold  mb-6 flex items-center">
                <Heart className="h-6 w-6 text-green-500 mr-3" />
                What We Encourage
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Sharing Knowledge
                  </h4>
                  <p className="text-green-700 text-sm">
                    Share your experiences, tutorials, and insights to help
                    others learn and grow.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Constructive Feedback
                  </h4>
                  <p className="text-green-700 text-sm">
                    Provide helpful, actionable feedback that helps authors
                    improve their content.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Mentoring
                  </h4>
                  <p className="text-green-700 text-sm">
                    Help newcomers by answering questions and providing
                    guidance.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Collaboration
                  </h4>
                  <p className="text-green-700 text-sm">
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
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Harassment & Bullying
                  </h4>
                  <p className="text-red-700 text-sm">
                    Any form of harassment, bullying, or intimidation is
                    strictly prohibited.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Spam & Self-Promotion
                  </h4>
                  <p className="text-red-700 text-sm">
                    Excessive self-promotion, spam, or irrelevant content that
                    doesn&apos;t add value.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Misinformation
                  </h4>
                  <p className="text-red-700 text-sm">
                    Spreading false information or unverified claims without
                    proper sources.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Inappropriate Content
                  </h4>
                  <p className="text-red-700 text-sm">
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
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 via-purple-500 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Report Violations</h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Help us maintain a safe community by reporting content that
              violates our guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">How to Report</h4>
              <ol className="space-y-3">
                {reportingSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-purple-100">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">What Happens Next</h4>
              <div className="space-y-3">
                <p className="text-purple-100">
                  Our moderation team reviews all reports carefully and takes
                  appropriate action based on our community guidelines.
                </p>
                <p className="text-purple-100">
                  Responses may include content removal, warnings, temporary
                  suspensions, or permanent bans depending on the severity.
                </p>
                <p className="text-purple-100">
                  We appreciate your help in keeping TechTales a welcoming place
                  for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-muted ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold  mb-4">
              Questions About Our Guidelines?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              If you have questions about our community guidelines or need
              clarification on any policy, we&apos;re here to help.
            </p>

            <a
              href="mailto:support@techtales.vercel.app"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:bg-cyan-700 hover:scale-y-105 transition-colors">
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
