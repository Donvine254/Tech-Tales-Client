import React from "react";
import { Tooltip } from "react-tooltip";
export default function Pagination({
  data,
  rows,
  currentPage,
  setCurrentPage,
  setRows,
}) {
  const totalPages = Math.ceil(data / rows);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleRowsChange = (e) => {
    setRows(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  const startIndex = (currentPage - 1) * rows + 1;
  const endIndex = Math.min(currentPage * rows, data);

  return (
    <div className="flex items-center justify-between my-3 max-w-full font-extralight text-gray-500">
      <div className="flex items-center gap-2">
        <label htmlFor="rows" className="whitespace-nowrap font-extralight">
          Rows per page:
        </label>
        <select
          id="rows"
          value={rows}
          onChange={handleRowsChange}
          className="bg-transparent">
          {[10, 15, 25, 50, 100, 150].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <span className="mx-2 whitespace-nowrap">
          {startIndex}-{endIndex} of {data}
        </span>
        <button
          type="button"
          data-tooltip-id="previous-page"
          className="disabled:opacity-50 disabled:pointer-events-none"
          onClick={handlePrevPage}
          disabled={currentPage === 1}>
          <Tooltip
            id="previous-page"
            place="bottom"
            content="Go to the previous page"
            variant="info"
            style={{ padding: "2px", fontSize: "12px" }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m14 16-4-4 4-4" />
          </svg>
        </button>
        <button
          type="button"
          data-tooltip-id="next-page"
          className="disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>
          <Tooltip
            id="next-page"
            place="bottom"
            content="Go to the next page"
            variant="info"
            style={{ padding: "2px", fontSize: "12px" }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m10 8 4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
