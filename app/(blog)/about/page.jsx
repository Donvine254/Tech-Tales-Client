"use client";
import React from "react";
import { Facebook, NewTwitterIcon, GithubIcon } from "@/assets";
import SubscribeModal, {
  SubscribeButton,
} from "@/components/alerts/subscribeModal";
import Link from "next/link";
import Image from "next/image";
export default function page() {
  return (
    <section className="font-poppins md:mt-8">
      <div className="p-2 bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1705348745/wlqqvrc1iqcbnfipageb.png')] bg-cover bg-no-repeat mb-4 ">
        <h1 className="font-bold md:leading-loose text-center text-xl md:text-3xl tracking-wide">
          Tech Tales - About Us
        </h1>
        <p className="leading-loose text-base text-center md:w-1/2 md:mx-auto xsm:text-sm">
          Tech Tales is an inclusive community where developers, tech students,
          enthusiasts and professionals can share, learn and grow.
        </p>
      </div>
      <section className="mt-2 p-4 mx-auto md:w-3/4">
        <h3 className="font-bold md:leading-loose text-xl md:text-3xl lg:text-4xl tracking-wide mb-2">
          Everyone has a story to tell!
        </h3>
        <p className="xsm:text-sm">
          The internet is a bit chaotic and finding the right information could
          take time. Tech Tales is a home for technology stories and ideas.
          Here, everyone is welcome to share insightful perspectives, useful
          knowledge, and life wisdom with the world.
        </p>
        <p className="xsm:text-sm my-2">
          We believe that what you read and write matters. Words can divide or
          empower us, inspire or discourage us. In a world where the most
          sensational and surface-level stories often win, we’re building a
          system that rewards depth, nuance, and time well spent. A space for
          thoughtful conversation more than drive-by takes, and substance over
          packaging.
        </p>
        <h2 className="font-bold md:leading-loose text-start text-xl md:text-3xl tracking-wide">
          Meet Our Founder
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 ">
          <div className=" border bg-gray-50 shadow xsm:w-full sm:py-6 lg:py-2 lg:px-4 p-2">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1704933173/tech-tales/profile-pictures/tj9r6trvxzkprzdyyrqe.jpg"
              width="150"
              height="150"
              alt="Founder"
              quality={100}
              className="mx-auto ring ring-offset-0 ring-cyan-500 overflow-hidden rounded-full object-cover italic bg-[#ccc]"
            />
            <p className="text-center font-bold">Donvine Mugendi</p>
            <p className="text-center">Fullstack software developer</p>
            <div className="flex items-center justify-between gap-2 my-2">
              <Link
                href="mailto:donvinemugendi@gmail.com"
                className="text-center text-white w-1/2 py-1 px-2 bg-blue-500 rounded-md">
                Hire Me
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=254702018079&text=Hello%2C%20I%20want%20more%20information%20about%20tech%20tales%F0%9F%98%8A"
                target="_blank"
                className="text-center text-white w-1/2 py-1 px-2 bg-green-500 rounded-md">
                Let&apos;s Chat
              </Link>
            </div>
          </div>
          <div className=" flex-1 p-2">
            <p className="xsm:text-sm">
              Hi, I&apos;m Don, the founder of TechTales. I created this blog as
              a school project at Moringa School but later saw the need to
              continue working on the project to build an inclusive community
              where people from all backgrounds can share their tech stories and
              inspire others.
            </p>
            <p className="xsm:text-sm my-2">
              As a developer, I&apos;ve experienced firsthand the challenges of
              navigating the industry. TechTales is my passion project, a space
              where we celebrate diversity, empower each other, and learn from
              one another&apos;s unique experiences.
            </p>
            <p className="xsm:text-sm mb-2">
              Whether you&apos;re a seasoned developer, a curious beginner, or
              somewhere in between, I invite you to join our community and be a
              part of this incredible journey. Share your experience with others
              and provide the resources you never had!
            </p>
          </div>
        </div>
      </section>
      <section className=" p-4 my-2 md:w-3/4 mx-auto">
        <div className="grid gap-2 sm:px-5 md:gap-6 md:grid-cols-2">
          <div className="space-y-2 ">
            <h2 className="font-bold md:leading-loose text-start text-xl md:text-3xl tracking-wide">
              Our Mission
            </h2>
            <p className="xsm:text-sm">
              At TechTales, our mission is to create an inclusive and welcoming
              community where tech enthusiasts from all walks of life can
              connect, share their stories, and learn from one another.
            </p>
            <p className="xsm:text-sm">
              We believe that diversity is the key to innovation, and we are
              committed to amplifying the voices of underrepresented groups in
              the tech industry. By fostering a safe and supportive environment,
              we aim to inspire the next generation of tech leaders and empower
              them to pursue their passions.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold md:leading-loose text-start text-xl md:text-3xl tracking-wide">
              Our Values
            </h2>
            <ul className="grid gap-4 subscribe-form">
              <li className="">
                <h3 className="text-lg font-bold">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We celebrate diversity and strive to create a welcoming space
                  for all tech enthusiasts.
                </p>
              </li>
              <li className="">
                <h3 className="text-lg font-bold">Empowerment</h3>
                <p className="text-muted-foreground">
                  We empower our community members to share their stories,
                  connect with others, and grow their skills.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold">Collaboration</h3>
                <p className="text-muted-foreground">
                  We believe in the power of collaboration and encourage our
                  community to support and learn from one another.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="p-4 my-2 md:w-3/4 mx-auto">
        <div className="grid gap-2 sm:px-5 md:gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="font-bold md:leading-loose text-start text-xl md:text-3xl tracking-wide">
              Join our Community
            </h2>
            <p className="xsm:text-sm">
              Whether you&apos;re a seasoned tech professional or just starting
              your journey, we invite you to join our vibrant community. Share
              your story, connect with like-minded individuals, and be a part of
              our mission to create a more inclusive tech landscape.
            </p>
            <div className="flex items-center gap-2 justify-between">
              <Link
                href="/register"
                className="py-1 my-2 px-4 rounded-md bg-blue-500 text-white text-center w-1/2">
                Register
              </Link>
              <SubscribeButton />
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-bold md:leading-loose text-start text-xl md:text-3xl tracking-wide">
              Connect with Us
            </div>
            <p className="xsm:text-sm">
              Stay up-to-date with the latest stories, events, and community
              updates by following us on social media. Connect with our team,
              engage with fellow tech enthusiasts, and be a part of the
              TechTales movement.
            </p>
            <div className="flex items-center gap-5 justify-between py-2 xsm:bg-gray-200 xsm:px-2">
              <Link
                href="https://x.com/diamonddegesh"
                className=" hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <NewTwitterIcon />
              </Link>

              <Link
                href="https://www.facebook.com/diamond.degesh.3"
                className=" hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <Facebook />
              </Link>

              <Link
                href="https://github.com/Donvine254"
                className=" hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                <GithubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/donvine-mugendi-2a909b116/"
                target="_blank"
                className="flex items-center justify-center gap-2">
                {" "}
                <svg
                  viewBox="0 0 960 1000"
                  fill="#0284C7"
                  height="24"
                  width="24">
                  <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                  <title>Linkedin</title>
                </svg>
              </Link>
              <Link
                href="https://youtube.com/tech-tales"
                className=""
                target="_blank">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="30"
                  width="30"
                  className="md:text-2xl text-red-500 fill-red-500 font-bold ">
                  <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 00-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 001.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
                </svg>
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=254702018079&text=Hello%2C%20I%20want%20more%20information%20about%20tech%20tales%F0%9F%98%8A"
                target="_blank"
                className="hover:underline font-medium">
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  className="fill-green-500">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SubscribeModal />
    </section>
  );
}
