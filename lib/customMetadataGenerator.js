export const customMetaDataGenerator = ({
  title,
  description,
  ogImage,
  keywords,
  canonicalUrl,
}) => {
  const metadata = {
    title,
    description,
    creator: "Donvine Mugendi",
    publisher: "Donvine Mugendi",
    openGraph: {
      title,
      url: canonicalUrl || "https://techtales.vercel.app",
      type: "article",
      description,
      images: [
        {
          url: ogImage || "",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: ogImage || "",
      creator: "@diamonddegesh",
    },
    keywords,
    verification: {
      google: "9SOlFuK-ili9ZVjwR08EAyntbaai9SO1QKx9Se4tOXk",
    },
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
  };
  return metadata;
};
