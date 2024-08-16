"use client";
import { Copy, NewTwitterIcon, Whatsapp } from "@/assets";
import toast from "react-hot-toast";
export default function ShareModal({ slug }) {
  const blogUrl = `https://techtales.vercel.app/blogs/${slug}`;
  // Function to open the share dialog for Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${blogUrl}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  // Function to open the share dialog for Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${blogUrl}&text=${slug}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  // Function to share on WhatsApp
  const shareOnWhatsApp = () => {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
      `See this article i found on techtales: ${blogUrl}`
    )}`;
    window.open(whatsappUrl);
  };

  // Function to copy the blog link to the clipboard
  const copyBlogLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
      toast.error("Failed to copy link to clipboard");
    }
  };

  return (
    <>
      {/* Facebook */}
      <button
        onClick={shareOnFacebook}
        className=" w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500  p-2">
        <svg
          fill="currentColor"
          viewBox="0 0 448 512"
          height="28"
          width="28"
          className="md:text-xl text-blue-600 font-bold cursor-pointer">
          <title>Facebook</title>
          <path d="M400 32H48A48 48 0 000 80v352a48 48 0 0048 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0048-48V80a48 48 0 00-48-48z" />
        </svg>
        <span>Share on Facebook</span>
      </button>

      {/* Twitter */}
      <button
        onClick={shareOnTwitter}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 p-2">
        <NewTwitterIcon />
        <span>Share on Twitter/X</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={shareOnWhatsApp}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500   p-2">
        <Whatsapp />
        <span>Share on Whatsapp</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyBlogLink}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200 hover:gray-blue-500  p-2">
        <Copy />
        <span>Copy Link</span>
      </button>
    </>
  );
}
