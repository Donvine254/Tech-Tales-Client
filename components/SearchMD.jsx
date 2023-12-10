"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/assets";

export const SearchMD = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    const value = query.trim();
    router.replace(`/?search=${value}`);
  }

  return (
    <form
      className="py-2 flex items-center justify-center  md:hidden"
      onSubmit={handleSearch}>
      <div className="relative xsm:mx-2">
        <input
          type="search"
          placeholder="search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl bg-slate-100 p-2 pl-10 px-4 xsm:w-full focus:bg-white text-black focus:outline-none text-xl"
        />
        <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  );
};
