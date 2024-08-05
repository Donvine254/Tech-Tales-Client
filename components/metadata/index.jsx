export const metaobject = {
  title: "Tech Tales",
  description:
    "Tech Tales: A blog for tech students and professionals to share coding solutions, enhance learning, and practice blogging.",
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
  publisher: "Donvine Mugendi",

  // Open Graph metadata
  openGraph: {
    title: "Tech Tales",
    description:
      "Tech Tales: A blog for tech students and professionals to share coding solutions, enhance learning, and practice blogging.",
    url: "https://techtales.vercel.app",
    siteName: "Tech Tales",
    images: [
      {
        url: "https://myawesomewebsite.com/og-image.jpg",
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
    title: "Tech Tales",
    description:
      "ech Tales: A blog for tech students and professionals to share coding solutions, enhance learning, and practice blogging.",
    creator: "@diamonddegesh",
    images: ["https://myawesomewebsite.com/twitter-image.jpg"],
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
