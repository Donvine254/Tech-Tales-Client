"use client";
import { useState } from "react";
import { handleSharing } from "@/lib/utils";
import { NewTwitterIcon, Whatsapp } from "@/assets";
import toast from "react-hot-toast";
export default function ShareModal({ slug, title }) {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
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
  // Function to share on Pinterest
  const shareOnPinterest = (title) => {
    const mediaUrl = "https://res.cloudinary.com/dipkbpinx/image/upload/v1729798081/tech-tales/cover-images/mfwulmwqff0uxojc3sra.jpg"; // Replace with the actual image URL
    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      blogUrl
    )}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(
      title
    )}`;

    window.open(pinterestUrl, "_blank", "width=600,height=400");
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
    setCopied(true);
    try {
      navigator.clipboard.writeText(blogUrl);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
      setCopied(false);
      toast.error("Failed to copy link to clipboard");
    }
  };

  const generateQRCode = async () => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      blogUrl
    )}`;
    setQrCode(qrCodeUrl);
    setShowQrModal(true); // Show QR modal
  };
  const closeQrModal = () => {
    setShowQrModal(false);
  };
  //function to close modal
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
      className="rounded-md  border inset-0 modal duration-300 ease-in-out backdrop-blur-3xl backdrop-brightness-150  max-w-sm xsm:mx-2 relative">
      <div className=" w-full p-6">
        <div className="flex items-center justify-between">
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
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm xsm:text-xs max-w-[75%]  flex items-center gap-2 ">
            <img src="/logo.png" alt="logo" width="20" height="20" />
            <span
              style={{ textOverflow: "ellipsis" }}
              className="truncate"
              title={title}>
              {title}
            </span>
          </p>
          <button
            className="flex items-center gap-1 text-sm xsm:text-xs outline-none hover:bg-gray-200 px-0.5"
            onClick={copyBlogLink}>
            {copied ? (
              <>
                <svg
                  fill="none"
                  viewBox="0 0 15 15"
                  height="1em"
                  width="1em"
                  className="text-green-500">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M14.707 3L5.5 12.207.293 7 1 6.293l4.5 4.5 8.5-8.5.707.707z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                {" "}
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="text-blue-500">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={36}
                    d="M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42"
                  />
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
      <hr />
      {/* Copy Link */}
      <div className="py-6 px-3 grid grid-cols-4 gap-4 items-center justify-center">
        {/* Facebook */}
        <div className="flex flex-col items-center">
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
        <div className="flex flex-col items-center">
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
        {/* pinterest */}
        <div className="flex flex-col items-center">
          <button
            className="flex items-center justify-center rounded-xl bg-[#E60023] w-12 h-12 text-white hover:shadow-[#E60023] hover:shadow-2xl"
            title="pinterest"
            onClick={shareOnPinterest}>
            <svg viewBox="0 0 24 24" fill="currentColor" height="30" width="30">
              <path d="M5.077 9.457c0-.778.136-1.513.404-2.199a5.63 5.63 0 011.121-1.802 7.614 7.614 0 011.644-1.329 7.513 7.513 0 012.002-.844 8.57 8.57 0 012.185-.281c1.139 0 2.199.241 3.182.721a6.021 6.021 0 012.391 2.094c.614.915.919 1.95.919 3.104 0 .692-.068 1.369-.207 2.031a8.28 8.28 0 01-.646 1.913 6.605 6.605 0 01-1.082 1.617 4.723 4.723 0 01-1.568 1.114 4.962 4.962 0 01-2.045.417c-.489 0-.977-.115-1.459-.346-.482-.23-.828-.546-1.036-.951-.073.281-.173.687-.306 1.218-.128.53-.214.872-.252 1.027-.04.154-.114.411-.222.767a5.183 5.183 0 01-.281.769l-.344.674a7.98 7.98 0 01-.498.838c-.181.262-.405.575-.672.935l-.149.053-.099-.108c-.107-1.133-.162-1.811-.162-2.035 0-.663.079-1.407.235-2.233.153-.825.395-1.862.72-3.109.325-1.246.511-1.979.561-2.196-.229-.467-.345-1.077-.345-1.827 0-.599.187-1.16.562-1.688.376-.526.851-.789 1.427-.789.441 0 .783.146 1.028.439.246.292.366.66.366 1.109 0 .476-.158 1.165-.476 2.066-.318.902-.476 1.575-.476 2.022 0 .453.162.832.486 1.129a1.68 1.68 0 001.179.449c.396 0 .763-.09 1.104-.271a2.46 2.46 0 00.849-.733 6.123 6.123 0 001.017-2.225c.096-.422.17-.823.216-1.2.049-.379.07-.737.07-1.077 0-1.247-.396-2.219-1.183-2.915-.791-.696-1.821-1.042-3.088-1.042-1.441 0-2.646.466-3.611 1.401-.966.932-1.452 2.117-1.452 3.554 0 .317.048.623.139.919.089.295.186.53.291.704.104.171.202.338.291.492.09.154.137.264.137.33 0 .202-.053.465-.16.79-.111.325-.242.487-.4.487-.015 0-.077-.011-.185-.034a2.21 2.21 0 01-.979-.605 3.17 3.17 0 01-.659-1.022 6.986 6.986 0 01-.352-1.169 4.884 4.884 0 01-.132-1.153z" />
            </svg>
          </button>
          <small>Pinterest</small>
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

        {/* QR Code Generator */}
        <div className="flex flex-col items-center">
          <button
            onClick={generateQRCode}
            className="flex items-center justify-center rounded-xl w-12 h-12 bg-gray-200 hover:bg-gray-100">
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="30"
              width="30">
              <title>Generate QR Code</title>
              <path d="M344 336 H408 A8 8 0 0 1 416 344 V408 A8 8 0 0 1 408 416 H344 A8 8 0 0 1 336 408 V344 A8 8 0 0 1 344 336 z" />
              <path d="M280 272 H328 A8 8 0 0 1 336 280 V328 A8 8 0 0 1 328 336 H280 A8 8 0 0 1 272 328 V280 A8 8 0 0 1 280 272 z" />
              <path d="M424 416 H472 A8 8 0 0 1 480 424 V472 A8 8 0 0 1 472 480 H424 A8 8 0 0 1 416 472 V424 A8 8 0 0 1 424 416 z" />
              <path d="M440 272 H472 A8 8 0 0 1 480 280 V312 A8 8 0 0 1 472 320 H440 A8 8 0 0 1 432 312 V280 A8 8 0 0 1 440 272 z" />
              <path d="M280 432 H312 A8 8 0 0 1 320 440 V472 A8 8 0 0 1 312 480 H280 A8 8 0 0 1 272 472 V440 A8 8 0 0 1 280 432 z" />
              <path d="M448 32H304a32 32 0 00-32 32v144a32 32 0 0032 32h144a32 32 0 0032-32V64a32 32 0 00-32-32zm-32 136a8 8 0 01-8 8h-64a8 8 0 01-8-8v-64a8 8 0 018-8h64a8 8 0 018 8zM208 32H64a32 32 0 00-32 32v144a32 32 0 0032 32h144a32 32 0 0032-32V64a32 32 0 00-32-32zm-32 136a8 8 0 01-8 8h-64a8 8 0 01-8-8v-64a8 8 0 018-8h64a8 8 0 018 8zM208 272H64a32 32 0 00-32 32v144a32 32 0 0032 32h144a32 32 0 0032-32V304a32 32 0 00-32-32zm-32 136a8 8 0 01-8 8h-64a8 8 0 01-8-8v-64a8 8 0 018-8h64a8 8 0 018 8z" />
            </svg>
          </button>
          <small>QR Code</small>
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
      {/* QR Code Modal */}
      {showQrModal && (
        <div
          id="qrModal"
          className="rounded-md bg-white h-fit absolute left-0 right-0 top-0 bottom-0 m-auto w-fit border z-50 shadow-gray-500 shadow-2xl ">
          <h6 className="text-base px-4 pt-2">Scan QR Code</h6>
          <div className="space-y-2 p-4 ">
            <img
              src={qrCode}
              alt="QR Code"
              height="250"
              width="250"
              className=""
            />
            <button
              onClick={closeQrModal}
              title="cancel"
              className="bg-gray-200 hover:bg-gray-100 hover:text-red-500 px-6 py-1 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
