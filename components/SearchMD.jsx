"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, SortDown, SortUp } from "@/assets";
import { categories } from "@/constants";
export const SearchMD = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [category, setCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const dropdownRef = useRef(null);
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
  function handleCategorySelect(value) {
    setShowDropdown(false);
    setCategory(value);
    setTimeout(() => {
      if (value !== "" && value) {
        router.replace(`/search?search=${value}`);
      }
    }, 100);
  }
  return (
    <form
      className="py-1 flex items-center justify-center z-99 md:hidden"
      onSubmit={handleSearch}>
      <div className="relative xsm:mx-2">
        <input
          type="search"
          id="search"
          name="search"
          autoCorrect="true"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl bg-gray-50 p-2 pl-8 pr-6  xsm:w-full   focus:outline-none border border-gray-300 h-10 focus:border-blue-500 text-black    placeholder-gray-600"
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
        <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 " />
      </div>
      <div
        className="cursor-pointer border bg-gray-50 hover:bg-blue-500
        hover:text-slate-200 rounded-xl p-2 m-1 h-10 border-gray-300 "
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
        <div className="absolute mt-1 border border-gray-300 rounded w-4/5 mx-4 z-10 ">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropdownOptions(!showDropdownOptions)}
              className="rounded-xl flex items-center gap-4 text-sm bg-white p-2 w-full focus:border-blue-500 justify-between border border-blue-500">
              {category === ""
                ? "All Categories"
                : categories.find((cat) => cat.value === category).label}
              {showDropdownOptions ? <SortUp /> : <SortDown />}
            </button>
            {showDropdownOptions && (
              <div className="absolute mt-2 w-full rounded-md px-2 py-1 bg-white shadow h-56 overflow-auto">
                {categories.map((cat) => (
                  <div
                    key={cat.value}
                    onClick={() => handleCategorySelect(cat.value)}
                    className={`flex items-center justify-between p-1 text-xs hover:bg-gray-200 rounded-md hover:text-blue-500 cursor-pointer ${
                      category === cat.value ? "text-blue-500" : ""
                    }`}>
                    <span>{cat.label}</span>
                    {category === cat.value && (
                      <svg
                        fill="none"
                        viewBox="0 0 15 15"
                        height="24"
                        width="24"
                        className="ml-12">
                        <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
