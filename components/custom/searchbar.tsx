import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? "w-64" : "w-10"
        }`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-gray-500 hover:text-cyan-600 transition-colors">
          <Search className="h-5 w-5" />
        </button>
        {isExpanded && (
          <input
            type="text"
            placeholder="Search articles..."
            className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent animate-fade-in"
            autoFocus
            onBlur={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
