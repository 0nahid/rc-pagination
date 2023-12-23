import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  color?: string;
  possibleLimits?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
  color = "#007",
  possibleLimits = [5, 10, 20, 50],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [selectedLimit, setSelectedLimit] = useState(itemsPerPage);

  useEffect(() => {
    // Ensure current page is valid based on the new total pages
    if (currentPage > totalPages) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage: number) => {
    // Ensure new page is within valid range
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

  // const renderPageNumbers = () => {
  //   const pageNumbers: Array<number | string> = [];
  //   const displayLimit = 10;

  //   if (totalPages <= displayLimit) {
  //     // If total pages are less than or equal to the display limit, show all pages
  //     for (let i = 1; i <= totalPages; i++) {
  //       pageNumbers.push(i);
  //     }
  //   } else {
  //     const midPoint = Math.floor(displayLimit / 2);
  //     const isNearStart = currentPage <= midPoint + 2;
  //     const isNearEnd = currentPage >= totalPages - midPoint - 1;

  //     if (isNearStart) {
  //       // If near the beginning, show pages 1 to displayLimit - 1, then ellipsis, and last page
  //       for (let i = 1; i < displayLimit - 1; i++) {
  //         pageNumbers.push(i);
  //       }
  //       pageNumbers.push("...");
  //       pageNumbers.push(totalPages);
  //     } else if (isNearEnd) {
  //       // If near the end, show first page, ellipsis, and pages totalPages - displayLimit + 3 to totalPages
  //       pageNumbers.push(1);
  //       pageNumbers.push("...");
  //       for (let i = totalPages - displayLimit + 3; i <= totalPages; i++) {
  //         pageNumbers.push(i);
  //       }
  //     } else {
  //       // Show first page, ellipsis, current page - midPoint to current page + midPoint, ellipsis, last page
  //       pageNumbers.push(1);
  //       pageNumbers.push("...");
  //       for (let i = currentPage - midPoint; i <= currentPage + midPoint; i++) {
  //         pageNumbers.push(i);
  //       }
  //       pageNumbers.push("...");
  //       pageNumbers.push(totalPages);
  //     }
  //   }

  //   return pageNumbers.map((page, index) => (
  //     <span
  //       key={index}
  //       style={{
  //         cursor: "pointer",
  //         padding: "8px 12px",
  //         margin: "0 4px",
  //         border: "1px solid #ccc",
  //         borderRadius: "4px",
  //         userSelect: "none",
  //         backgroundColor: page === currentPage || page === "..." ? color : "inherit",
  //         color: page === currentPage || page === "..." ? "#fff" : "inherit",
  //       }}
  //       onClick={() => {
  //         if (typeof page === "number") {
  //           handlePageChange(page);
  //         }
  //       }}
  //     >
  //       {page}
  //     </span>
  //   ));
  // };

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
        // If near the end, show first page, ellipsis, and pages totalPages - displayLimit + 3 to totalPages
        pageNumbers.push(1);
        if (currentPage > displayLimit - 2) {
          pageNumbers.push("...");
        }
        for (let i = totalPages - displayLimit + 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page, ellipsis, current page - midPoint to current page + midPoint, ellipsis, last page
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
          padding: "8px 12px",
          margin: "0 4px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          userSelect: "none",
          backgroundColor: page === currentPage || page === "..." ? color : "inherit",
          color: page === currentPage || page === "..." ? "#fff" : "inherit",
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
  

  return (
    <div>
      <select
        value={selectedLimit}
        onChange={handleLimitChange}
        style={{
          padding: "8px",
          marginRight: "10px",
          backgroundColor: color,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {possibleLimits.map((limit) => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
