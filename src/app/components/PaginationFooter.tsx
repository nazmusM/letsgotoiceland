"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PaginationFooterProps {
  baseURL: string;
  currentPage: number;
  totalPages: number;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  baseURL,
  currentPage,
  totalPages,
}) => {
  const router = useRouter();

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      // Only render the current page, two pages before, and two pages after
      if (
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage - 2 ||
        i === currentPage + 1 ||
        i === currentPage + 2
      ) {
        pageNumbers.push(
          <span
            key={i}
            className={`flex items-center justify-center ${
              i === currentPage
                ? "h-8 w-8 shrink-0 grow-0 cursor-default rounded-full bg-black text-white"
                : "h-8 w-8 shrink-0 grow-0 cursor-pointer rounded-full bg-white text-black"
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </span>,
        );
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        // Render ellipses for the remaining pages
        pageNumbers.push(
          <span
            key={i}
            className="flex h-8 w-8 shrink-0 grow-0 cursor-default items-center justify-center rounded-full bg-white text-black"
          >
            ...
          </span>,
        );
      }
    }

    return pageNumbers;
  };

  const handlePageClick = (pageNumber: number) => {
    if (
      pageNumber < 1 ||
      pageNumber === currentPage ||
      pageNumber > totalPages
    ) {
      return;
    }
    router.push(`${baseURL}?page=${pageNumber}`);
  };

  return (
    <div className="pagination-footer mt-3 w-full text-center font-semibold">
      <div className="flex items-center justify-center space-x-5">
        <span
          className={`arrow  ${currentPage === 1 ? "cursor-default opacity-50" : "cursor-pointer"}`}
          onClick={() => currentPage !== 1 && handlePageClick(currentPage - 1)}
        >
          {"<"}
        </span>
        {renderPageNumbers()}
        <span
          className={`arrow  ${currentPage === totalPages ? "cursor-default opacity-50" : "cursor-pointer"}`}
          onClick={() =>
            currentPage !== totalPages && handlePageClick(currentPage + 1)
          }
        >
          {">"}
        </span>
      </div>
    </div>
  );
};

export default PaginationFooter;
