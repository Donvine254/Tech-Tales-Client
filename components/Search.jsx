"use client";
import { useState, useEffect, useRef } from "react";
import { SearchIcon, SortDown } from "@/assets";
import { useRouter } from "next/navigation";
import { categories, options } from "@/constants";
import { Tooltip } from "react-tooltip";

export const Search = () => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [category, setCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const [comboOptions, setComboOptions] = useState(options);
  const [showComboOptions, setShowComboOptions] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionsContainerRef = useRef(null);
  useEffect(() => {
    if (isListening) {
      const recognition =
        new window.webkitSpeechRecognition() || new window.SpeechRecognition();
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById("combobox-input");
        input.value = transcript.trim();
        setIsListening(false);
        router.replace(`/search?search=${transcript.trim()}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  }, [isListening, router]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowDropdownOptions(false);
      }
      if (
        (inputRef.current && !inputRef.current.contains(e.target)) ||
        (optionsContainerRef.current &&
          !optionsContainerRef.current.contains(e.target))
      ) {
        setShowComboOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setComboOptions("");
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value)
    );
    if (filteredOptions.length > 0) {
      setShowComboOptions(true);
      setComboOptions(filteredOptions);
    } else {
      setComboOptions(["No Results Found"]);
    }
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

  const handleComboSearch = (option) => {
    const input = document.getElementById("combobox-input");
    input.value = option.trim();
    input.focus();
    setShowComboOptions(false);
  };

  return (
    <div className="hidden md:flex  md:items-center gap-2">
      <form
        className="md:py-2 md:flex md:items-center md:justify-center"
        action="/search/">
        <search className="relative">
          <input
            type="search"
            id="combobox-input"
            name="search"
            minLength={2}
            ref={inputRef}
            onInput={handleSearch}
            placeholder="Search blogs..."
            autoCorrect="on"
            spellCheck={true}
            autoComplete="search"
            className="rounded-xl bg-gray-50 p-2 pl-8 pr-6 px-4 w-full focus:border-blue-500  text-black focus:outline-none text-xl border-2 border-gray-300   placeholder-gray-600 shadow"
          />

          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.25rem"
            width="1.25rem"
            className="w-5 h-5 text-gray-900 absolute right-1 top-1/2 transform -translate-y-1/2 hover:text-cyan-500 focus:outline-none"
            onClick={startVoiceSearch}
            aria-description="search by voice"
            data-tooltip-id="voice-search">
            <path
              d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z"
              strokeWidth="2"
            />
            <path
              d="M10 8a2 2 0 11-4 0V3a2 2 0 114 0v5zM8 0a3 3 0 00-3 3v5a3 3 0 006 0V3a3 3 0 00-3-3z"
              strokeWidth="2"
            />
          </svg>
          <Tooltip
            id="voice-search"
            variant="info"
            content="search by voice"
            style={{ padding: "4px" }}
          />
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          {showComboOptions && (
            <div
              className="absolute top-full left-0 right-0 border border-gray-300 max-h-[250px] max-w-[400px] mx-auto mt-2 overflow-y-auto bg-white block rounded-lg z-50"
              id="options-container"
              ref={optionsContainerRef}>
              {comboOptions &&
                comboOptions?.map((option, index) => (
                  <div
                    key={index}
                    className={`${
                      option === "No Results Found"
                        ? "p-2 text-[#999] cursor-not-allowed pointer-events-none"
                        : "p-2 cursor-pointer hover:bg-[##f0f0f0]"
                    }`}
                    onClick={() => handleComboSearch(option)}>
                    {option}
                  </div>
                ))}
            </div>
          )}
        </search>
        <div
          className="cursor-pointer border-2 bg-gray-50 hover:bg-cyan-500 hover:text-slate-200 rounded-xl p-2 px-3 m-1 border-gray-300 hover:border-cyan-500 shadow "
          onClick={() => setShowDropdown(!showDropdown)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-tooltip-id="category-search">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            <title>Search by Category</title>
          </svg>
          <Tooltip
            id="category-search"
            variant="info"
            content="search by by category"
            style={{ padding: "4px" }}
          />
        </div>
        {showDropdown && (
          <div className="absolute top-full mt-1 border border-gray-300 rounded w-fit z-10">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdownOptions(!showDropdownOptions)}
                className="rounded-xl flex items-center gap-4 py-2 bg-white p-2 w-64 focus:outline-none justify-between border border-blue-500">
                {category === ""
                  ? "All Categories"
                  : categories.find((cat) => cat.value === category).label}
                <SortDown />
              </button>
              {showDropdownOptions && (
                <div className="absolute mt-2 w-full rounded-md px-2 py-1 bg-white shadow h-56 overflow-auto">
                  {categories.map((cat) => (
                    <div
                      key={cat.value}
                      onClick={() => handleCategorySelect(cat.value)}
                      className={`flex items-center justify-between p-1 hover:bg-gray-200 rounded-md hover:text-blue-500 cursor-pointer ${
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
    </div>
  );
};
