import React, { useContext, useState } from "react";
import paginationArrow from "../utils/pagination-arrow.svg";
import { MovieContext } from "../context/MovieContext";

const Pagination = () => {
  const { page, setPage, totalPages, movieData } = useContext(MovieContext);
  const [inputPage, setInputPage] = useState("");

  const TotalNumber = totalPages;

  const next = () => {
    if (page < TotalNumber) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(TotalNumber);
    }
  };

  const multiStepNext = () => {
    setPage(Math.min(page + 3, TotalNumber));
  };

  const multiStepPrev = () => {
    setPage(Math.max(page - 3, 1));
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= TotalNumber) {
      setPage(pageNumber);
    }
    setInputPage("");
  };

  if (movieData && movieData.results && movieData.results.length > 0) {
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
          {page > 3 && (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          )}
          {page > 1 && (
            <li>
              <button
                onClick={prev}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page - 1}
              </button>
            </li>
          )}
          <li>
            <button
              disabled
              className="outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-200 text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>
          {page < TotalNumber && (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          )}
          {page < TotalNumber - 2 && (
            <li>
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          )}
          {(page === TotalNumber || page === TotalNumber - 1) && (
            <li>
              <button
                onClick={() => setPage(1)}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                1
              </button>
            </li>
          )}
          {page < TotalNumber && (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="outline-0 hover:text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {TotalNumber}
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
            max={TotalNumber}
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
