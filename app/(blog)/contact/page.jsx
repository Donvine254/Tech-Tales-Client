import { Facebook, GithubIcon, NewTwitterIcon } from "@/assets";
import ContactForm from "./contact";
export const metadata = {
  title: "Contact Us- Tech Tales",
};

export default function Contact() {
  return (
    <section className="font-poppins md:mt-8">
      <div className="p-2 bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1705348745/wlqqvrc1iqcbnfipageb.png')] bg-cover bg-no-repeat  ">
        <h1 className="font-bold md:leading-loose text-center text-xl md:text-3xl tracking-wide">
          Get in Touch
        </h1>
        <p className="text-center  my-2">
          We would like to hear from you. Here is how you can get in touch with
          us
        </p>
        <div className="flex items-center  justify-center gap-5 flex-wrap">
          <div className="bg-gray-50 p-6 h-60 xsm:w-3/4 rounded-md shadow space-y-4">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="60"
              width="60"
              className="fill-blue-500 mx-auto my-2">
              <path d="M12 .64L8.23 3H5v2L2.97 6.29C2.39 6.64 2 7.27 2 8v10a2 2 0 002 2h16c1.11 0 2-.89 2-2V8c0-.73-.39-1.36-.97-1.71L19 5V3h-3.23M7 5h10v4.88L12 13 7 9.88M8 6v1.5h8V6M5 7.38v1.25L4 8m15-.62L20 8l-1 .63M8 8.5V10h8V8.5z" />
            </svg>
            <p className="text-lg font-bold xsm:text-base text-center">Email</p>
            <p className="text-xs">Send us an email message</p>
            <a
              href="mailto:donvinemugendi@gmail.com"
              className="font-bold text-lg xsm:text-base hover:underline">
              support@techtales.vercel.app
            </a>
          </div>
          <div className="bg-gray-50 p-6 h-60 xsm:w-3/4 rounded-md shadow space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-blue-500 mx-auto my-2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <p className="text-lg font-bold xsm:text-base text-center">
              Phone Number
            </p>
            <p className="text-xs">
              Call, text or whatsapp us on our official number.
            </p>
            <a
              href="tel:0702018079"
              className="hover:underline font-bold text-lg xsm:text-base">
              +254 702018079
            </a>
          </div>

          <div className="p-6 space-y-4 h-60 xsm:w-3/4 rounded-md bg-gray-50">
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="60"
              width="60"
              className="fill-blue-500 mx-auto my-2">
              <path d="M3 2a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V2zm6 11a1 1 0 10-2 0 1 1 0 002 0z" />
            </svg>
            <p className="text-lg font-bold xsm:text-base text-center">
              Socials
            </p>
            <p className="text-xs text-center ">
              Find us in all your favorite social media platforms.
            </p>
            <div className="flex items-center justify-between gap-x-2">
              <a
                href="https://x.com/diamonddegesh"
                className="text-muted-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <NewTwitterIcon />
              </a>
              <a
                href="https://www.facebook.com/diamond.degesh.3"
                className="text-muted-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <Facebook />
              </a>
              <a
                href="https://github.com/Donvine254"
                className="text-muted-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/donvine-mugendi-2a909b116/"
                className="text-muted-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <svg
                  viewBox="0 0 960 1000"
                  fill="#0284C7"
                  height="26"
                  width="26">
                  <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                  <title>Linkedin</title>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* add form */}
      <ContactForm />
    </section>
  );
}
