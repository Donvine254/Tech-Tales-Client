"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    console.log("what are you searching for?");
  }

  return (
    <form className="relative py-2 flex items-center" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-full bg-base-200 dark:bg-gray-800 p-2 pl-10 px-4 w-full focus:bg-gray-600 dark:hover:bg-gray-600 text-white focus:outline-none text-xl hidden md:block border-2 dark:border-none"
      />
      <FaSearch className="h-5 w-5 absolute left-3 text-gray-300 hidden md:block" />
    </form>
  );
};
