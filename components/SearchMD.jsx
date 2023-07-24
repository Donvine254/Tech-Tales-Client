'use client'
import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";

export const SearchMD = () => {
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
          className="rounded-xl bg-slate-200 dark:bg-gray-800 p-2 pl-10 px-4 xsm:w-full xsm:mx-10 w-2/3 m-auto focus:bg-gray-600 text-white focus:outline-none text-xl md:hidden"
        />
        <FaSearch className="h-5 w-5 absolute xsm:left-3 text-gray-300 xsm:mx-10 hidden xsm:block" />
      </form>
    );
  };