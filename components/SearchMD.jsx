"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/assets";

export const SearchMD = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [category, setCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (isListening) {
      const recognition =
        new window.webkitSpeechRecognition() || new window.SpeechRecognition();
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        router.replace(`/search?search=${transcript.trim()}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  }, [isListening, router]);

  function handleSearch(e) {
    e.preventDefault();
    const value = query.trim();
    router.replace(`/search?search=${value}`);
  }
  function startVoiceSearch() {
    setIsListening(true);
  }
  return (
    <form
      className="py-1 flex items-center justify-center  md:hidden"
      onSubmit={handleSearch}>
      <div className="relative xsm:mx-2">
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl bg-slate-100 p-2 pl-8 pr-6 px-4  xsm:w-full  focus:bg-blue-100 focus:bg-opacity-30 text-black focus:outline-none text-xl"
        />
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="1.25rem"
          width="1.25rem"
          className="w-5 h-5 text-gray-900 absolute right-1 top-1/2 transform -translate-y-1/2 hover:text-blue-600"
          onClick={startVoiceSearch}
          aria-hidden="true">
          <title>Search by Voice</title>
          <path
            d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z"
            strokeWidth="2"
          />
          <path
            d="M10 8a2 2 0 11-4 0V3a2 2 0 114 0v5zM8 0a3 3 0 00-3 3v5a3 3 0 006 0V3a3 3 0 00-3-3z"
            strokeWidth="2"
          />
        </svg>
        <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div
        className="cursor-pointer border-2 bg-slate-100 hover:bg-blue-500 hover:text-slate-200 rounded-xl p-2 px-3 m-1 border-gray-300 "
        onClick={() => setShowDropdown(!showDropdown)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          <title>Search by Category</title>
        </svg>
      </div>
      {showDropdown && (
        <div className="absolute mt-24 w-fit rounded z-10">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setShowDropdown(false);
              setTimeout(() => {
                if (e.target.value !== "") {
                  router.replace(`/search?search=${e.target.value}`);
                }
              }, 100);
            }}
            className="rounded-xl bg-sky-500 p-2  focus:outline-none border-2 border-gray-300 text-slate-200">
            <option value="">All Categories</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="react">React</option>
            <option value="rails">Ruby on Rails</option>
            <option value="nextjs">Next.js</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
            <option value="html css">HTML & CSS</option>
            <option value="host">Hosting</option>
          </select>
        </div>
      )}
    </form>
  );
};
