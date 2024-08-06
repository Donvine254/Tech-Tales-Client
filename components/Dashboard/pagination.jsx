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

  return (
    <div className="pagination-container flex items-center justify-between p-2 my-3">
      <div className="rows-per-page">
        <label htmlFor="rows">Rows per page:</label>
        <select
          id="rows"
          value={rows}
          onChange={handleRowsChange}
          className="bg-transparent">
          {[10, 25, 50, 100, 150].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="page-navigation flex items-center">
        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          data-tooltip-id="previous-page"
          className=""
          onClick={handlePrevPage}
          disabled={currentPage === 1}>
          <Tooltip
            id="previous-page"
            place="bottom"
            content="Go to the previous page"
            variant="info"
            effect="solid"
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
            strokeLinejoin="round"
            className="">
            <path d="m11 17-5-5 5-5" />
          </svg>
        </button>
        <button
          type="button"
          data-tooltip-id="next-page"
          className=""
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>
          <Tooltip
            id="next-page"
            place="bottom"
            content="Go to the next page"
            variant="info"
            effect="solid"
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
            strokeLinejoin="round"
            className="">
            <path d="m6 17 5-5-5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
