import React, { useContext, useState, useRef, useEffect } from "react";
import searchIcon from "../utils/search-icon.svg";
import { debounce } from "lodash";
import { MovieContext } from "../context/MovieContext";
import { MOVIE_POSTER_IMG } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ debounceFunc }) => {
  const [search, setSearch] = useState("");
  const { searchData, setSearchData } = useContext(MovieContext);
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    let input = e.target.value;
    setSearch(input);
    debounceFunc(input);
    setShowResults(!!input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const selectMovie = (id) => {
    setSearchData(null);
    setSearch("");
    setShowResults(false);
    navigate(`/movie/${id}`);
  };

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          placeholder="search here"
          onChange={handleSearch}
          value={search}
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-yellow-200"
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} className="w-full h-auto" alt="search" />
        </button>
      </form>
      {showResults && searchData && searchData.results && (
        <ul
          className="absolute top-11 right-0 w-96 h-[40rem] rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-300 z-10"
          ref={resultsRef}
        >
          {searchData.results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => selectMovie(movie.id)}
              className="flex items-center cursor-pointer ml-4 my-2"
            >
              <img
                src={MOVIE_POSTER_IMG + movie.poster_path}
                alt={movie.title}
                className="w-24 h-auto mx-1.5"
              />
              <span>{movie.original_title}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Search = () => {
  const { getSearchData } = useContext(MovieContext);

  const debounceFunc = debounce(function (val) {
    getSearchData(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput debounceFunc={debounceFunc} />
    </div>
  );
};

export default Search;
