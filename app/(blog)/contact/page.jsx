import { Facebook, GithubIcon, NewTwitterIcon } from "@/assets";
import ContactForm from "./contact";
export const metadata = {
  title: "Contact Us- Tech Tales",
};

export default function Contact() {
  return (
    <section className="font-poppins md:mt-8">
      <div className="p-2 bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1705348745/wlqqvrc1iqcbnfipageb.png')] bg-cover bg-no-repeat mb-4 ">
        <h1 className="font-bold md:leading-loose text-center text-xl md:text-3xl tracking-wide">
          Get in Touch
        </h1>
        <p className="text-center  my-2">
          We would like to hear from you. Here is how you can get in touch with
          us
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 m-2 md:m-0 md:w-4/5 lg:w-2/3 md:mx-auto ">
        <div className="border shadow rounded-md bg-gray-50 py-6 px-4 space-y-4 flex-shrink">
          <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2 ">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M12 .64L8.23 3H5v2L2.97 6.29C2.39 6.64 2 7.27 2 8v10a2 2 0 002 2h16c1.11 0 2-.89 2-2V8c0-.73-.39-1.36-.97-1.71L19 5V3h-3.23M7 5h10v4.88L12 13 7 9.88M8 6v1.5h8V6M5 7.38v1.25L4 8m15-.62L20 8l-1 .63M8 8.5V10h8V8.5z" />
            </svg>
            <a
              href="mailto:donvinemugendi@gmail.com"
              className="font-medium hover:underline">
              support@techtales.vercel.app
            </a>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <a href="tel:0702018079" className="hover:underline font-medium">
              +254 702018079
            </a>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="24"
              width="24"
              className="fill-green-500">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
            </svg>
            <a href="tel:0702018079" className="hover:underline font-medium">
              +254 702018079
            </a>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
            <a
              href="https://x.com/diamonddegesh"
              className=" hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              <NewTwitterIcon />
            </a>
            <a
              href="https://x.com/diamonddegesh"
              className=" hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              Twitter/X
            </a>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
            <a
              href="https://www.facebook.com/diamond.degesh.3"
              className=" hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              <Facebook />
            </a>
            <a
              href="https://www.facebook.com/diamond.degesh.3"
              className=" hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
        {/* add form */}
        <ContactForm />
      </div>
    </section>
  );
}
