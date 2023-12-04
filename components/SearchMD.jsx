"use client";
import React, { useState } from "react";
import { useRouter} from "next/navigation";
import { FaSearch } from "react-icons/fa";

export const SearchMD = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    const value = query.trim();
    router.replace(`/?search=${value}`);
  }

  return (
    <form className="relative py-2 flex items-center" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-xl bg-slate-200 dark:bg-gray-800 p-2 pl-10 px-4 xsm:w-full xsm:mx-10 w-2/3 m-auto focus:bg-gray-600 text-white focus:outline-none text-xl md:hidden"
      />
      <FaSearch className="h-5 w-5 absolute xsm:left-3 text-gray-300 xsm:mx-10 hidden xsm:block" />
    </form>
  );
};
