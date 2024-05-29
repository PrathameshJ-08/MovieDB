import React, { useContext, useState } from "react";
import searchIcon from "../utils/search-icon.svg";
import { debounce } from "lodash";
import { MovieContext } from "../context/MovieContext";
import { MOVIE_POSTER_IMG } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ debounceFunc }) => {
  const [search, setSearch] = useState("");
  const { searchData, setSearchData } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    let input = e.target.value;
    setSearch(input);
    debounceFunc(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const selectMovie = (id) => {
    setSearchData(null);
    setSearch("");
    navigate(`/movie/${id}`);
  };

  console.log(searchData);
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
      {search.length > 0 ? (
        <ul className="absolute top-11 right-0 w-96 h-[40rem] rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 z-10">
          {searchData ? (
            searchData?.results.map((movie) => {
              return (
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
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-yellow-200 border-b-gray-200 rounded-full animate-spin" />
              <span className="ml-2">Searching</span>
            </div>
          )}
        </ul>
      ) : null}
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
