"use client";
import { Scale } from "lucide-react";
import { useState, useEffect } from "react";

const Terms = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "description", title: "Service Description" },
    { id: "accounts", title: "User Accounts" },
    { id: "content", title: "Content Guidelines" },
    { id: "intellectual", title: "Intellectual Property" },
    { id: "privacy", title: "Privacy & Data" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(element.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
                <Scale className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-lg md:mb-4 md:text-2xl lg:text-3xl font-bold mb-6">
              Terms of Use
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
              Please read these terms carefully before using Tech Tales. By
              accessing our platform, you agree to be bound by these terms and
              conditions.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: June 01, 2025
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="md:sticky md:top-20 lg:top-24 bg-blue-400 rounded-lg border border-border p-4 text-white">
              <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50  text-blue-700  border-l-2 border-blue-600 font-bold"
                        : "text-white hover:bg-accent hover:text-foreground"
                    }`}>
                    {index + 1}. {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-card rounded-lg border border-border divide-y divide-border">
              {/* Acceptance of Terms */}
              <section id="acceptance" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    By accessing and using Tech Tales (&quot;the Service&quot;),
                    you accept and agree to be bound by the terms and provision
                    of this agreement. If you do not agree to abide by the
                    above, please do not use this service.
                  </p>
                  <p className="mb-4">
                    These Terms of Use constitute a legally binding agreement
                    between you and Tech Tales regarding your use of the
                    platform, including all content, features, and services
                    offered.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      You must be at least 13 years old to use this service
                    </li>
                    <li>
                      You are responsible for maintaining the confidentiality of
                      your account
                    </li>
                    <li>
                      You agree to provide accurate and complete information
                    </li>
                  </ul>
                </div>
              </section>

              {/* Service Description */}
              <section id="description" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  2. Service Description
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Tech Tales is a technology blog platform that provides
                    articles, tutorials, and community discussions about web
                    development, programming, and digital innovation.
                  </p>
                  <p className="mb-4">Our services include:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Access to technology articles and tutorials</li>
                    <li>Community features for discussion and interaction</li>
                    <li>User-generated content capabilities</li>
                    <li>Newsletter subscriptions and notifications</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any
                    aspect of the service at any time without prior notice.
                  </p>
                </div>
              </section>

              {/* User Accounts */}
              <section id="accounts" className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    To access certain features of Tech Tales , you may be
                    required to create an account. You are responsible for
                    maintaining the security of your account and password.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Account Requirements:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information as necessary</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                  <p>
                    You are fully responsible for all activities that occur
                    under your account, regardless of whether such activities
                    are authorized by you.
                  </p>
                </div>
              </section>

              {/* Content Guidelines */}
              <section id="content" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  4. Content Guidelines
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Users may contribute content to Tech Tales through comments,
                    posts, or other interactive features. All user-generated
                    content must comply with our community standards.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Prohibited Content:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Harmful, threatening, or harassing material</li>
                    <li>Spam or commercial solicitation</li>
                    <li>Copyright or trademark infringement</li>
                    <li>False or misleading information</li>
                    <li>Malicious code or security vulnerabilities</li>
                  </ul>
                  <p>
                    We reserve the right to remove any content that violates
                    these guidelines and to suspend or terminate accounts of
                    users who repeatedly violate our policies.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  5. Intellectual Property
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    All content on Tech Tales , including text, graphics, logos,
                    images, and software, is the property of Tech Tales or its
                    content suppliers and is protected by intellectual property
                    laws.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Your Content:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      You retain ownership of content you create and submit
                    </li>
                    <li>
                      You grant Tech Tales a license to use, modify, and display
                      your content
                    </li>
                    <li>
                      You must have the right to submit any content you post
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Our Content:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>May not be reproduced without permission</li>
                    <li>
                      May be used for personal, non-commercial purposes with
                      attribution
                    </li>
                    <li>Commercial use requires explicit written consent</li>
                  </ul>
                </div>
              </section>

              {/* Privacy & Data */}
              <section id="privacy" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  6. Privacy & Data Protection
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Your privacy is important to us. Our Privacy Policy explains
                    how we collect, use, and protect your information when you
                    use Tech Tales .
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Data Collection:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Account information and profile data</li>
                    <li>Usage analytics and interaction data</li>
                    <li>Comments and user-generated content</li>
                    <li>Device and browser information</li>
                  </ul>
                  <p>
                    By using Tech Tales , you consent to the collection and use
                    of your information as outlined in our Privacy Policy, which
                    is incorporated into these Terms by reference.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  7. Limitation of Liability
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Tech Tales is provided &quot;as is&quot; without any
                    representations or warranties of any kind. We do not
                    guarantee the accuracy, completeness, or reliability of any
                    content or service.
                  </p>
                  <div className="border border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40 rounded-lg p-4 mb-4">
                    <p className="font-medium">
                      <span className="font-bold">Important:</span> To the
                      fullest extent permitted by law, Tech Tales shall not be
                      liable for any indirect, incidental, special,
                      consequential, or punitive damages.
                    </p>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Disclaimers:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>No warranty of uninterrupted or error-free service</li>
                    <li>No guarantee of data security or backup</li>
                    <li>No responsibility for third-party content or links</li>
                    <li>Users assume all risks associated with service use</li>
                  </ul>
                </div>
              </section>

              {/* Termination */}
              <section id="termination" className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Either party may terminate this agreement at any time. Tech
                    Tales reserves the right to suspend or terminate your access
                    for violations of these terms.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Termination Conditions:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Violation of community guidelines or terms</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Excessive resource usage or abuse</li>
                    <li>User request for account deletion</li>
                  </ul>
                  <p>
                    Upon termination, your right to use the service ceases
                    immediately. We may retain certain information as required
                    by law or for legitimate business purposes.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Tech Tales reserves the right to modify these Terms of Use
                    at any time. We will notify users of significant changes
                    through email or prominent notices on the platform.
                  </p>
                  <div className="border-amber-600 border bg-amber-100 text-amber-900 dark:text-amber-500 dark:border-amber-500 dark:bg-amber-900/20  rounded-lg p-4 mb-4">
                    <p>
                      <span className="font-bold">Your continued use</span> of
                      Tech Tales after changes are posted constitutes acceptance
                      of the modified terms.
                    </p>
                  </div>
                  <p>
                    It is your responsibility to review these terms
                    periodically. If you do not agree to the modified terms, you
                    should discontinue use of the service.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  10. Contact Information
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    If you have any questions about these Terms of Use or need
                    to report a violation, please contact us using the
                    information below.
                  </p>
                  <div className="bg-accent shadow rounded-lg p-6 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">
                        Email:
                      </span>
                      <a
                        href="mailto:support@techtales.vercel.app"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        support@techtales.vercel.app
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">
                        Response Time:
                      </span>
                      <span>Within 5 business days</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    These terms are governed by and construed in accordance with
                    applicable laws. Any disputes shall be resolved through
                    appropriate legal channels.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
