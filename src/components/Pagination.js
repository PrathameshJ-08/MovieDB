import React, { useContext, useState } from "react";
import paginationArrow from "../utils/Images/pagination-arrow.svg";
import { MovieContext } from "../context/MovieContext";

const Pagination = () => {
  const {
    page,
    setPage,
    totalPages,
    searchPage,
    setSearchPage,
    searchTotalPages,
    isSearchMode,
    searchData,
    movieData,
  } = useContext(MovieContext);
  const [inputPage, setInputPage] = useState("");

  const currentPage = isSearchMode ? searchPage : page;
  const currentTotalPages = isSearchMode ? searchTotalPages : totalPages;
  const setCurrentPage = isSearchMode ? setSearchPage : setPage;

  const next = () => {
    if (currentPage < currentTotalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentTotalPages);
    }
  };

  const multiStepNext = () => {
    setCurrentPage(Math.min(currentPage + 3, currentTotalPages));
  };

  const multiStepPrev = () => {
    setCurrentPage(Math.max(currentPage - 3, 1));
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= currentTotalPages) {
      setCurrentPage(pageNumber);
    }
    setInputPage("");
  };

  if (
    (isSearchMode && searchData && searchData.results.length > 0) ||
    (!isSearchMode && movieData && movieData.results.length > 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center mt-4 text-white font-bold">
        <ul className="flex items-center text-sm mb-2">
          <li>
            <button
              className="outline-0 hover:text-yellow-100 w-8"
              onClick={prev}
            >
              <img
                className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>
          {currentPage > 3 && (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          )}
          {currentPage > 1 && (
            <li>
              <button
                onClick={prev}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {currentPage - 1}
              </button>
            </li>
          )}
          <li>
            <button
              disabled
              className="outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-200 text-gray-300 mx-1.5"
            >
              {currentPage}
            </button>
          </li>
          {currentPage < currentTotalPages && (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {currentPage + 1}
              </button>
            </li>
          )}
          {currentPage < currentTotalPages - 2 && (
            <li>
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          )}
          {(currentPage === currentTotalPages ||
            currentPage === currentTotalPages - 1) && (
            <li>
              <button
                onClick={() => setCurrentPage(1)}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                1
              </button>
            </li>
          )}
          {currentPage < currentTotalPages && (
            <li>
              <button
                onClick={() => setCurrentPage(currentTotalPages)}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {currentTotalPages}
              </button>
            </li>
          )}
          <li>
            <button
              className="outline-0 hover:text-yellow-100 w-8"
              onClick={next}
            >
              <img
                className="w-full h-auto"
                src={paginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
        <form onSubmit={handleJumpToPage} className="flex items-center">
          <input
            type="number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="text-yellow-200 rounded w-16 h-8 text-center bg-gray-200 outline-0 border border-transparent focus:border-yellow-200"
            placeholder="Page"
            min="1"
            max={currentTotalPages}
          />
          <button
            type="submit"
            className="ml-2 outline-0 hover:text-yellow-100 rounded bg-gray-200 px-2 py-1"
          >
            Go
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
