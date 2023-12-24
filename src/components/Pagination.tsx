import React, { useEffect, useState } from "react";
import { PaginationProps } from "../types/paginate";

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
  color = "#007",
  possibleLimits = [5, 10, 20, 50],
}) => {
  const [selectedLimit, setSelectedLimit] = useState(
    possibleLimits.length > 0 ? possibleLimits[0] : 10 // Use the first value as the initial limit, default to 10 if the array is empty
  );
  const [totalPages, setTotalPages] = useState(0);

  setItemsPerPage(selectedLimit); 

  console.log("selectedLimit", selectedLimit);

  useEffect(() => {
    const totalPages = Math.ceil(
      totalItems / Math.max(selectedLimit, itemsPerPage)
    );
    // Now, you can use totalPages as needed
    setTotalPages(totalPages);
  }, [totalItems, selectedLimit, itemsPerPage]);

  useEffect(() => {
    // Ensure the current page is valid based on the new total pages
    if (currentPage > totalPages) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage: number) => {
    // Ensure the new page is within the valid range
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    // Update the parent component or perform any additional actions
    setCurrentPage(validPage);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setSelectedLimit(newLimit);
    // Reset to the first page when changing the items per page
    handlePageChange(1);
    // Update the parent component or perform any additional actions
    setItemsPerPage(newLimit);
  };

  const renderPageNumbers = () => {
    const pageNumbers: Array<number | string> = [];
    const displayLimit = 6; // Adjust this value to your desired range

    if (totalPages <= displayLimit) {
      // If total pages are less than or equal to the display limit, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const midPoint = Math.floor(displayLimit / 2);

      if (currentPage <= midPoint + 1) {
        // If near the beginning, show pages 1 to displayLimit - 1, then ellipsis, and last page
        for (let i = 1; i <= displayLimit - 1; i++) {
          pageNumbers.push(i);
        }
        if (currentPage < totalPages - displayLimit + 2) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - midPoint) {
        // If near the end, show the first page, ellipsis, and pages totalPages - displayLimit + 3 to totalPages
        pageNumbers.push(1);
        if (currentPage > displayLimit - 2) {
          pageNumbers.push("...");
        }
        for (let i = totalPages - displayLimit + 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show the first page, ellipsis, current page - midPoint to current page + midPoint, ellipsis, last page
        pageNumbers.push(1);
        if (currentPage > midPoint + 2) {
          pageNumbers.push("...");
        }
        for (let i = currentPage - midPoint; i <= currentPage + midPoint; i++) {
          pageNumbers.push(i);
        }
        if (currentPage < totalPages - midPoint - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((page, index) => (
      <span
        key={index}
        style={{
          cursor: "pointer",
          padding: "8px 10px",
          margin: "0 4px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          userSelect: "none",
          backgroundColor:
            page === currentPage || page === "..." ? color : "inherit",
          color: page === currentPage || page === "..." ? "#fff" : "inherit",
          ...(window.innerWidth <= 600 && {
            padding: "8px 6px",
            margin: "0 2px",
          }),
        }}
        onClick={() => {
          if (typeof page === "number") {
            handlePageChange(page);
          }
        }}
      >
        {page}
      </span>
    ));
  };

  const renderLimitSelect = () => {
    if (possibleLimits.length <= 1) {
      return null; // If there's only one or no option, don't render the select element
    }

    return (
      <select
        value={selectedLimit}
        onChange={handleLimitChange}
        style={{
          padding: "8px",
          margin: "0 4px",
          backgroundColor: color,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          // Mobile styles
          ...(window.innerWidth <= 600 && {
            padding: "8px 6px",
            margin: "0 2px",
          }),
        }}
      >
        {possibleLimits.map((limit) => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    );
  };

  const handlePrevClick = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div>
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: currentPage === 1 ? `${color}80` : "transparent", // Apply light color only to Prev when disabled
          color: currentPage === 1 ? "#ccc" : "",
          // Mobile styles
          ...(window.innerWidth <= 600 && {
            padding: "8px 6px",
            margin: "0 2px",
          }),
        }}
      >
        Prev
      </button>
      {/* <select
        value={selectedLimit}
        onChange={handleLimitChange}
        style={{
          padding: "8px",
          margin: "0 4px",
          backgroundColor: color,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          // Mobile styles
          ...(window.innerWidth <= 600 && {
            padding: "8px 6px",
            margin: "0 2px",
          }),
        }}
      >
        {possibleLimits.map((limit) => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select> */}
      {renderLimitSelect()}

      {renderPageNumbers()}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor:
            currentPage === totalPages ? `${color}80` : "transparent", // Apply light color only to Next when disabled
          color: currentPage === totalPages ? "#ccc" : "",
          // Mobile styles
          ...(window.innerWidth <= 600 && {
            padding: "8px 6px",
            margin: "0 2px",
          }),
        }}
      >
        Next
      </button>
    </div>
  );
};
