import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import searchIcon from "../utils/Images/search-icon.svg";
import CloseIcon from "../utils/Images/close-icon.svg";
import { MovieContext } from "../context/MovieContext";
import { MOVIE_POSTER_IMG } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {
    searchData,
    setSearchData,
    getSearchData,
    setIsSearchMode,
    setListType,
    setPage,
    setSearchPage,
    isSearchActive,
    setIsSearchActive,
  } = useContext(MovieContext);
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef(null);

  const debouncedSearchSuggestions = useCallback(
    debounce(async (input) => {
      if (input) {
        await getSearchData(input);
        setShowResults(true);
      }
    }, 300),
    []
  );

  const handleSearch = (e) => {
    let input = e.target.value;
    setSearch(input);
    setShowResults(false);
    debouncedSearchSuggestions(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search) {
      await getSearchData(search);
      setShowResults(false);
      setIsSearchMode(true);
      setListType("search_results");
      setIsSearchActive(true);
      setPage(1);
      navigate("/");
      setSearchPage(1);
    }
  };

  const handleReset = () => {
    setSearchData(null);
    setSearch("");
    setShowResults(false);
    setIsSearchMode(false);
    setListType("now_playing");
    setIsSearchActive(false);
    setSearchPage(1);
    setPage(1);
  };

  const selectMovie = (id) => {
    setSearchData(null);
    setSearch("");
    setShowResults(false);
    setIsSearchMode(false);
    setListType("now_playing");
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
        className="w-96 relative flex items-center ml-7"
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
          {isSearchActive ? (
            <img src={CloseIcon} onClick={handleReset} className="w-5 h-auto" />
          ) : (
            <img src={searchIcon} className="w-full h-auto" alt="search" />
          )}
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
  return (
    <div className="relative">
      <SearchInput />
    </div>
  );
};

export default Search;
