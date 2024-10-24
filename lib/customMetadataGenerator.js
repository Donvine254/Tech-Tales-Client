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
      images: [ogImage || ""],
    },
    keywords,
  };
  return metadata;
};
