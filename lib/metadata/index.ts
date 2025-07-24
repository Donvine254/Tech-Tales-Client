import { Metadata } from "next";

export const metaobject: Metadata = {
  title: "Code Tutorials, AI Guides & Dev Tips - Tech Tales",
  description:
    "Tech Tales is a dynamic blogging platform for tech students, developers, and professionals to explore programming insights, share real-world coding solutions, and engage in continuous learning. From JavaScript and AI to modern web development frameworks, this community-driven blog is your go-to resource for tutorials, best practices, and thought leadership in tech.",
  // Basic metadata
  applicationName: "Tech Tales",
  authors: [{ name: "Donvine Mugendi", url: "https://techtales.vercel.app" }],
  generator: "Next.js",
  keywords: [
    "next.js",
    "react",
    "javascript",
    "typescript",
    "artificial intelligence",
    "blog",
    "technology",
    "coding tutorials",
    "programming blog",
    "developer tips",
  ],
  creator: "Donvine Mugendi",
  publisher: "Tech Tales",

  // Open Graph metadata
  openGraph: {
    title: "Code Tutorials, AI Guides & Dev Tips - Tech Tales",
    description:
      "Tech Tales is a dynamic blogging platform for tech students, developers, and professionals to explore programming insights, share real-world coding solutions, and engage in continuous learning. From JavaScript and AI to modern web development frameworks, this community-driven blog is your go-to resource for tutorials, best practices, and thought leadership in tech.",
    url: "https://techtales.vercel.app",
    siteName: "Tech Tales",
    images: [
      {
        // replace this with url to og-image
        url: "https://techtales.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tech Tales",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Tech Tales | Code Tutorials, AI Guides & Dev Tips",
    description:
      "Tech Tales is a dynamic blogging platform for tech students, developers, and professionals to explore programming insights, share real-world coding solutions, and engage in continuous learning. From JavaScript and AI to modern web development frameworks, this community-driven blog is your go-to resource for tutorials, best practices, and thought leadership in tech.",
    creator: "@diamonddegesh",
    images: ["https://techtales.vercel.app/logo.png"],
  },

  // Verification for search engines
  verification: {
    google: "9SOlFuK-ili9ZVjwR08EAyntbaai9SO1QKx9Se4tOXk",
  },
  // App-specific metadata
  appleWebApp: {
    capable: true,
    title: "Tech Tales",
    statusBarStyle: "black-translucent",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
