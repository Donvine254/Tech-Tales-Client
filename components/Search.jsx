"use client";
import { useState, useEffect } from "react";
import { SearchIcon } from "@/assets";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
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
    <div className="hidden md:flex md:items-center gap-2">
      <div
        className="cursor-pointer border-2 hover:bg-sky-500 hover:text-slate-200 rounded-xl p-2 px-4"
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
        <div className="absolute top-full mt-1 border border-gray-300 rounded w-fit z-10">
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

      <form
        className="md:py-2 md:flex md:items-center md:justify-center"
        onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="search"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-xl bg-gray-50 p-2 pl-10 px-4 w-full focus:bg-[#e6e6e6] text-black focus:outline-none text-xl border-2 border-gray-300   placeholder-gray-600"
          />
          <svg
            className="w-5 h-5 text-gray-900 absolute right-1 top-1/2 transform -translate-y-1/2 hover:text-blue-600"
            onClick={startVoiceSearch}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21">
            <title>Search by Voice</title>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
            />
          </svg>
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </form>
    </div>
  );
};
