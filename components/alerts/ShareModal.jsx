"use client";
import { handleSharing } from "@/lib/utils";
import { Copy, NewTwitterIcon, Whatsapp } from "@/assets";
import toast from "react-hot-toast";
export default function ShareModal({ slug, title }) {
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
  // Function to share on Reddit
  const shareOnReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${blogUrl}&title=${title}`;
    window.open(redditUrl, "_blank", "width=600,height=400");
  };

  // Function to share on LinkedIn
  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`;
    window.open(linkedinUrl, "_blank", "width=600,height=400");
  };

  // Function to share on Telegram
  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${blogUrl}&text=${title}`;
    window.open(telegramUrl, "_blank", "width=600,height=400");
  };
  //function to share via email
  const shareViaEmail = () => {
    const emailSubject = `Check out this article on Techtales: ${title}`;
    const emailBody = `I found this interesting article on Techtales: ${blogUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, "_self");
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
  const closeShareModal = () => {
    const shareModal = document.getElementById("shareModal");
    if (shareModal) {
      shareModal.close();
    } else {
      console.log("modal not found");
    }
  };
  return (
    <dialog
      id="shareModal"
      className="rounded-md  border inset-0 modal duration-300 ease-in-out backdrop-blur-3xl backdrop-brightness-150  max-w-sm xsm:mx-2">
      <div className="flex items-center justify-between w-full p-6">
        <h1 className="md:text-xl">Share Post</h1>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          className="hover:text-red-500 "
          onClick={closeShareModal}>
          <path
            fill="currentColor"
            d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
          />
        </svg>
      </div>
      <hr />
      {/* Copy Link */}
      <div className="p-6 flex flex-wrap xsm:gap-4 gap-5 items-center">
        <div className="flex flex-col">
          <button
            onClick={copyBlogLink}
            className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-xl w-12 h-12 bg-gray-200 border-none outline-none">
            <Copy className="stroke-2" size={30} />
          </button>
          <small>Copy Link</small>
        </div>

        {/* Facebook */}
        <div className="flex flex-col">
          <button
            className="flex items-center justify-center rounded-xl bg-[#3B5998] w-12 h-12 text-white hover:shadow-blue-600 hover:shadow-2xl "
            onClick={shareOnFacebook}>
            <svg
              fill="currentColor"
              viewBox="0 0 500 1000"
              height="30"
              width="30">
              <title>Facebook</title>
              <path d="M500 206H358c-9.333 0-17.667 5-25 15-7.333 10-11 22.333-11 37v102h178v148H322v442H152V508H0V360h152v-86c0-62.667 19.667-115.667 59-159s88.333-65 147-65h142v156" />
            </svg>
          </button>
          <small>Facebook</small>
        </div>

        {/* Twitter */}
        <div className="flex flex-col items-center">
          <button
            onClick={shareOnTwitter}
            title="twitter/x"
            className="flex items-center justify-center rounded-xl bg-gray-100  hover:bg-gray-200 w-12 h-12 ">
            <NewTwitterIcon size={30} />
          </button>
          <small>X</small>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col items-center">
          <button
            onClick={shareOnWhatsApp}
            title="whatsapp"
            className="flex items-center justify-center rounded-xl w-12 h-12 bg-green-500 text-white hover:shadow-green-500 hover:shadow-2xl">
            <Whatsapp className="fill-white " size={30} />
          </button>
          <small>Whatsapp</small>
        </div>
        {/* telegram */}
        <div className="flex flex-col items-center">
          <button
            onClick={shareOnTelegram}
            title="telegram"
            className="flex items-center justify-center rounded-xl w-12 h-12 bg-[#24A2E0] text-white hover:shadow-[#24A2E0] hover:shadow-2xl">
            <svg viewBox="0 0 24 24" fill="currentColor" height="30" width="30">
              <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
            </svg>
          </button>
          <small>Telegram</small>
        </div>
        {/* reddit */}
        <div className="flex flex-col items-center">
          <button
            onClick={shareOnReddit}
            title="reddit"
            className="flex items-center justify-center rounded-xl w-12 h-12 bg-[#FF4500] text-white hover:shadow-[#FF4500] hover:shadow-2xl ">
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="30"
              width="30">
              <path d="M324 256a36 36 0 1036 36 36 36 0 00-36-36z" />
              <path
                transform="rotate(-22.5 187.997 291.992)"
                d="M224 292 A36 36 0 0 1 188 328 A36 36 0 0 1 152 292 A36 36 0 0 1 224 292 z"
              />
              <path d="M496 253.77c0-31.19-25.14-56.56-56-56.56a55.72 55.72 0 00-35.61 12.86c-35-23.77-80.78-38.32-129.65-41.27l22-79 66.41 13.2c1.9 26.48 24 47.49 50.65 47.49 28 0 50.78-23 50.78-51.21S441 48 413 48c-19.53 0-36.31 11.19-44.85 28.77l-90-17.89-31.1 109.52-4.63.13c-50.63 2.21-98.34 16.93-134.77 41.53A55.38 55.38 0 0072 197.21c-30.89 0-56 25.37-56 56.56a56.43 56.43 0 0028.11 49.06 98.65 98.65 0 00-.89 13.34c.11 39.74 22.49 77 63 105C146.36 448.77 199.51 464 256 464s109.76-15.23 149.83-42.89c40.53-28 62.85-65.27 62.85-105.06a109.32 109.32 0 00-.84-13.3A56.32 56.32 0 00496 253.77zM414 75a24 24 0 11-24 24 24 24 0 0124-24zM42.72 253.77a29.6 29.6 0 0129.42-29.71 29 29 0 0113.62 3.43c-15.5 14.41-26.93 30.41-34.07 47.68a30.23 30.23 0 01-8.97-21.4zM390.82 399c-35.74 24.59-83.6 38.14-134.77 38.14S157 423.61 121.29 399c-33-22.79-51.24-52.26-51.24-83A78.5 78.5 0 0175 288.72c5.68-15.74 16.16-30.48 31.15-43.79a155.17 155.17 0 0114.76-11.53l.3-.21.24-.17c35.72-24.52 83.52-38 134.61-38s98.9 13.51 134.62 38l.23.17.34.25A156.57 156.57 0 01406 244.92c15 13.32 25.48 28.05 31.16 43.81a85.44 85.44 0 014.31 17.67 77.29 77.29 0 01.6 9.65c-.01 30.72-18.21 60.19-51.25 82.95zm69.6-123.92c-7.13-17.28-18.56-33.29-34.07-47.72A29.09 29.09 0 01440 224a29.59 29.59 0 0129.41 29.71 30.07 30.07 0 01-8.99 21.39z" />
              <path d="M323.23 362.22c-.25.25-25.56 26.07-67.15 26.27-42-.2-66.28-25.23-67.31-26.27a4.14 4.14 0 00-5.83 0l-13.7 13.47a4.15 4.15 0 000 5.89c3.4 3.4 34.7 34.23 86.78 34.45 51.94-.22 83.38-31.05 86.78-34.45a4.16 4.16 0 000-5.9l-13.71-13.47a4.13 4.13 0 00-5.81 0z" />
            </svg>
          </button>
          <small>Reddit</small>
        </div>
        {/* linkedin */}
        <div className="flex flex-col">
          <button
            className="flex items-center justify-center rounded-xl bg-[#0077B5] w-12 h-12 text-white hover:shadow-[#0077B5] hover:shadow-2xl"
            title="linkedin"
            onClick={shareOnLinkedIn}>
            <svg viewBox="0 0 24 24" fill="currentColor" height="30" width="30">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
            </svg>
          </button>
          <small>Linkedin</small>
        </div>
        {/* email */}
        <div className="flex flex-col items-center">
          <button
            className="flex items-center justify-center rounded-xl bg-gray-200 hover:bg-gray-300 w-12 h-12 text-gray-700"
            title="email"
            onClick={shareViaEmail}>
            <svg viewBox="0 0 24 24" fill="currentColor" height="30" width="30">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
            </svg>
          </button>
          <small>Email</small>
        </div>
        {/* open webshare API */}
        <div className="flex flex-col items-center">
          <button
            className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-xl w-12 h-12 bg-gray-200 border-none outline-none"
            onClick={() => {
              handleSharing(title, slug);
              closeShareModal();
            }}>
            <svg fill="none" viewBox="0 0 15 15" height="30" width="30">
              <path
                stroke="currentColor"
                d="M3 7.5a.5.5 0 11-1 0 .5.5 0 011 0zM8 7.5a.5.5 0 11-1 0 .5.5 0 011 0zM13 7.5a.5.5 0 11-1 0 .5.5 0 011 0z"
              />
            </svg>
          </button>
          <small>More..</small>
        </div>
      </div>
    </dialog>
  );
}
