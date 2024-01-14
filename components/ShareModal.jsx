"use client";
import { Copy, Facebook, Twitter, Whatsapp } from "@/assets";
import toast from "react-hot-toast";
export default function ShareModal({ id, slug }) {
  const blogUrl = `https://techtales.vercel.app/blogs/${id}`;
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
        className=" w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md p-2">
        <Facebook />
        <span>Share on Facebook</span>
      </button>

      {/* Twitter */}
      <button
        onClick={shareOnTwitter}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500  rounded-md p-2">
        <Twitter />
        <span>Share on Twitter</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={shareOnWhatsApp}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500  rounded-md p-2">
        <Whatsapp />
        <span>Share on Whatsapp</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyBlogLink}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200 hover:gray-blue-500 rounded-md p-2">
        <Copy />
        <span>Copy Link</span>
      </button>
    </>
  );
}
