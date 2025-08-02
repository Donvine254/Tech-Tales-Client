"use client";
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "overview", title: "Privacy Overview" },
    { id: "collection", title: "Information We Collect" },
    { id: "usage", title: "How We Use Your Data" },
    { id: "sharing", title: "Data Sharing & Disclosure" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "rights", title: "Your Privacy Rights" },
    { id: "security", title: "Data Security" },
    { id: "retention", title: "Data Retention" },
    { id: "international", title: "International Transfers" },
    { id: "changes", title: "Privacy Policy Changes" },
    { id: "contact", title: "Contact Us" },
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
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-lg md:mb-4 md:text-2xl lg:text-3xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
              Your privacy matters to us. This policy explains how TechTales
              collects, uses, and protects your personal information in
              compliance with GDPR and other privacy regulations.
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
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border border-border divide-y divide-border">
              {/* Privacy Overview */}
              <section id="overview" className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Privacy Overview</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    TechTales (&quot;we,&quot; &quot;us,&quot; or
                    &quot;our&quot;) is committed to protecting your privacy and
                    ensuring transparency about how we handle your personal
                    information. This Privacy Policy complies with the General
                    Data Protection Regulation (GDPR) and other applicable
                    privacy laws.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                    <p className="text-green-800 dark:text-green-200">
                      <span className="font-bold">Your Rights:</span> You have
                      the right to access, rectify, erase, restrict processing,
                      and port your personal data. You can also object to
                      processing and withdraw consent at any time.
                    </p>
                  </div>
                  <p>
                    As a technology blog platform, we only collect information
                    necessary to provide our services and improve your
                    experience.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="collection" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  2. Information We Collect
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We collect information that you provide directly and
                    information that is automatically collected when you use our
                    platform.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Information You Provide:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Account information (name, email address, username)</li>
                    <li>Profile information and preferences</li>
                    <li>Comments, posts, and other user-generated content</li>
                    <li>Newsletter subscription preferences</li>
                    <li>Contact form submissions and support requests</li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Automatically Collected Information:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      Device information (IP address, browser type, operating
                      system)
                    </li>
                    <li>
                      Usage data (pages visited, time spent, click patterns)
                    </li>
                    <li>
                      Technical data (cookies, local storage, session
                      information)
                    </li>
                    <li>Referral sources and search terms</li>
                  </ul>
                  <p>
                    We use this information to provide, maintain, and improve
                    our services, and to comply with legal obligations.
                  </p>
                </div>
              </section>

              {/* How We Use Your Data */}
              <section id="usage" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  3. How We Use Your Data
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We process your personal data based on legitimate interests,
                    consent, and legal obligations. Here&apos;s how we use your
                    information:
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Service Provision:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Creating and managing your account</li>
                    <li>
                      Displaying your content and facilitating interactions
                    </li>
                    <li>
                      Personalizing your experience and content recommendations
                    </li>
                    <li>
                      Processing newsletter subscriptions and notifications
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Communication:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Sending service-related announcements and updates</li>
                    <li>Responding to your inquiries and support requests</li>
                    <li>
                      Delivering newsletters and content updates (with consent)
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Analytics & Improvement:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Analyzing usage patterns to improve our platform</li>
                    <li>Conducting research and developing new features</li>
                    <li>Monitoring platform security and preventing abuse</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing & Disclosure */}
              <section id="sharing" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  4. Data Sharing & Disclosure
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We do not sell your personal information. We may share your
                    data only in the following circumstances:
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Service Providers:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Cloud hosting and infrastructure providers</li>
                    <li>
                      Email service providers for newsletters and communications
                    </li>
                    <li>Analytics services to understand platform usage</li>
                    <li>Security services to protect against threats</li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Legal Requirements:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Compliance with applicable laws and regulations</li>
                    <li>Response to valid legal requests and court orders</li>
                    <li>Protection of our rights and prevention of fraud</li>
                  </ul>
                  <div className="border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40  border  rounded-lg p-4 mb-4">
                    <p className="text-foreground font-medium">
                      All third-party service providers are required to maintain
                      appropriate data protection standards and use your
                      information only for specified purposes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies & Tracking */}
              <section id="cookies" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  5. Cookies & Tracking Technologies
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We use cookies and similar technologies to enhance your
                    experience and understand how you use our platform.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Types of Cookies:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      <span className="font-bold">Essential Cookies:</span>{" "}
                      Required for basic platform functionality
                    </li>
                    <li>
                      <span className="font-bold">Preference Cookies:</span>{" "}
                      Remember your settings and preferences
                    </li>
                    <li>
                      <span className="font-bold">Analytics Cookies:</span> Help
                      us understand usage patterns (with consent)
                    </li>
                    <li>
                      <span className="font-bold">Marketing Cookies:</span> Used
                      for content personalization (with consent)
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Managing Cookies:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      You can control cookies through your browser settings
                    </li>
                    <li>
                      Use our cookie preference center to manage non-essential
                      cookies
                    </li>
                    <li>
                      Note that disabling essential cookies may affect platform
                      functionality
                    </li>
                  </ul>
                </div>
              </section>

              {/* Your Privacy Rights */}
              <section id="rights" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  6. Your Privacy Rights (GDPR)
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Under GDPR and other privacy laws, you have several rights
                    regarding your personal data:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40 border rounded-lg p-4">
                      <h5 className="font-bold text-foreground mb-2">
                        Right to Access
                      </h5>
                      <p className="text-sm">
                        Request a copy of the personal data we hold about you
                      </p>
                    </div>
                    <div className="border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40 border rounded-lg p-4">
                      <h5 className="font-bold text-foreground mb-2">
                        Right to Rectification
                      </h5>
                      <p className="text-sm">
                        Correct inaccurate or incomplete personal data
                      </p>
                    </div>
                    <div className="border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40 border rounded-lg p-4">
                      <h5 className="font-bold text-foreground mb-2">
                        Right to Erasure
                      </h5>
                      <p className="text-sm">
                        Request deletion of your personal data
                      </p>
                    </div>
                    <div className="border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40 border rounded-lg p-4">
                      <h5 className="font-bold text-foreground mb-2">
                        Right to Portability
                      </h5>
                      <p className="text-sm">
                        Receive your data in a machine-readable format
                      </p>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    How to Exercise Your Rights:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Contact us at privacy@techtales.app</li>
                    <li>
                      Use the data management tools in your account settings
                    </li>
                    <li>We will respond to requests within 30 days</li>
                    <li>
                      You may also file a complaint with your local data
                      protection authority
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section id="security" className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We implement appropriate technical and organizational
                    measures to protect your personal data against unauthorized
                    access, alteration, disclosure, or destruction. You are
                    responsible of securing your account using a strong password
                    and reporting any data breach incident to us for further
                    investigation.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Security Measures:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response procedures</li>
                  </ul>
                  <div className="bg-amber-50 dark:bg-amber-800/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                    <p className="text-amber-800 dark:text-amber-200">
                      <span className="font-bold">
                        Data Breach Notification:
                      </span>{" "}
                      In the unlikely event of a data breach, we will notify
                      affected users and relevant authorities within 72 hours as
                      required by law.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Retention */}
              <section id="retention" className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We retain your personal data only for as long as necessary
                    to fulfill the purposes outlined in this policy or as
                    required by law.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Retention Periods:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      <span className="font-bold">Account Data:</span> Until
                      account deletion or 3 years of inactivity
                    </li>
                    <li>
                      <span className="font-bold">Content & Comments:</span>{" "}
                      Until deletion by user or account closure
                    </li>
                    <li>
                      <span className="font-bold">Analytics Data:</span>{" "}
                      Anonymized after 26 months
                    </li>
                    <li>
                      <span className="font-bold">Support Tickets:</span> 5
                      years for quality assurance
                    </li>
                    <li>
                      <span className="font-bold">Marketing Data:</span> Until
                      consent withdrawal
                    </li>
                  </ul>
                  <p>
                    When data is no longer needed, we securely delete or
                    anonymize it in accordance with our data retention schedule.
                  </p>
                </div>
              </section>

              {/* International Transfers */}
              <section id="international" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  9. International Data Transfers
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Your personal data may be transferred to and processed in
                    countries outside your jurisdiction. We ensure appropriate
                    safeguards are in place for all international transfers.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Transfer Safeguards:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>EU Standard Contractual Clauses (SCCs)</li>
                    <li>Adequacy decisions from relevant authorities</li>
                    <li>Data Processing Addendums with service providers</li>
                    <li>Regular assessment of transfer risks</li>
                  </ul>
                  <p>
                    We continuously monitor the legal landscape and update our
                    transfer mechanisms to ensure your data remains protected
                    regardless of location.
                  </p>
                </div>
              </section>

              {/* Privacy Policy Changes */}
              <section id="changes" className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  10. Privacy Policy Changes
                </h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    We may update this Privacy Policy periodically to reflect
                    changes in our practices, technology, or legal requirements.
                  </p>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Notification Process:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      Material changes will be announced with 30 days notice
                    </li>
                    <li>Email notifications to registered users</li>
                    <li>Prominent notice on our platform</li>
                    <li>Updated effective date at the top of this policy</li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      <span>Your continued use</span> of TechTales after changes
                      are posted constitutes acceptance of the updated Privacy
                      Policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="p-8">
                <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
                <div className="prose max-w-none text-muted-foreground">
                  <p className="mb-4">
                    If you have questions about this Privacy Policy, want to
                    exercise your rights, or need to report a privacy concern,
                    please contact us:
                  </p>
                  <div className="border-blue-600 bg-blue-100 text-blue-900 dark:text-white dark:border-blue-500 dark:bg-blue-900/40 border rounded-lg p-6 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">
                        Privacy Officer:
                      </span>
                      <a
                        href="mailto:pbluey@techtales.app"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        privacy@techtales.app
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">
                        Data Protection Officer:
                      </span>
                      <a
                        href="mailto:dpo@techtales.app"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        dpo@techtales.app
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">
                        Response Time:
                      </span>
                      <span>Within 30 days (GDPR requirement)</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    For EU residents: You have the right to lodge a complaint
                    with your local supervisory authority if you believe your
                    data protection rights have been violated.
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

export default Privacy;
