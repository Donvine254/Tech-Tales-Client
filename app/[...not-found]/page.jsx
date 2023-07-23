
import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <main className="h-screen m-5">
      <Link href="/home">
        <h1 className="text-xl text-center md:text-3xl font-bold lg:text-4xl m-auto cursor-pointer">
          Tech Tales{" "}
          <span className="text-red-600 text-2xl md:text-5xl">.</span>
        </h1>
      </Link>
      <div className="m-5 flex items-center justify-center bg-black-600 text-white">
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <h1 className="text-red-600 text-xl md:text-4xl font-bold">
              Whoops!
            </h1>
            <h1 className="my-1 font-bold md:text-2xl">
              This page got lost in the conversation
            </h1>
            <p className="my-2 md:text-xl">
              You must have picked the wrong door because i have not been able to
              lay an eye on the page you are searching for.
            </p>

            <Link href="/home">
              {" "}
              <button className="rounded-sm p-2 px-4 shadow-md my-2 border border-sky-500 hover:bg-sky-500 font-bold">
                Take me back!
              </button>
            </Link>

            <div>
              <picture>
                <source media="(min-width:650px)" srcset="https://i.ibb.co/G9DC8S0/404-2.png"/>
                <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="not-found" />
              </picture>
            </div>
          </div>
          <div>
            <picture>
              <source media="(min-width:650px )" srcset="https://i.ibb.co/ck1SGFJ/Group.png" />
              <img src="https://i.ibb.co/ck1SGFJ/Group.png"alt="another 404? Jesus!" />
            </picture>
          </div>
        </div>
      </div>
    </main>
  );
}
