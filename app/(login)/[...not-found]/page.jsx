import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <main className="w-full h-screen bg-[url('../public/404.svg')] bg-cover bg-center bg-no-repeat relative">
      <Link href="/">
        <h1 className="text-xl text-center md:text-3xl font-bold lg:text-4xl cursor-pointer">
          Tech Tales{" "}
          <span className="text-red-600 text-2xl md:text-5xl">.</span>
        </h1>
      </Link>
      <Link href="/">
        {" "}
        <button className="p-4 px-6 my-2 border font-bold absolute bottom-5 left-[50%] bg-blue-500 text-white rounded-lg">
          Take me back!
        </button>
      </Link>
    </main>
  );
}
