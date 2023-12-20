"use client";
import { useState } from "react";
import { SearchIcon } from "@/assets";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    const value = query.trim();
    router.replace(`/?search=${value}`);
  }

  return (
    <form
      className="hidden md:py-2 md:flex md:items-center md:justify-center  "
      onSubmit={handleSearch}>
      <div className="relative">
        <input
          type="search"
          placeholder="search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-full bg-gray-50 p-2 pl-10 px-4 w-full focus:bg-[#e6e6e6] text-black focus:outline-none text-xl border-2 border-gray-300  focus:border-blue-500 placeholder-gray-600"
        />
        <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
      </div>
    </form>
  );
};
