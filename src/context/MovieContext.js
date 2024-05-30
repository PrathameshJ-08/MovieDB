import React, { createContext, useEffect, useState } from "react";
import { API_KEY } from "../utils/constants";

export const MovieContext = createContext({});

export const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState({ results: [] });
  const [movieDetails, setMovieDetails] = useState();
  const [castDetails, setCastDetails] = useState();
  const [listType, setListType] = useState("now_playing");
  const [searchData, setSearchData] = useState({ results: [], query: "" });
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const getMovieData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${listType}?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const jsonData = await response.json();
      setMovieData(jsonData);
      setTotalPages(227);
      // setTotalPages(jsonData.total_pages || 1);
    } catch (error) {
      console.error("Failed to fetch: movie-data:", error);
    }
  };

  const getMovie = async (id) => {
    try {
      const details = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const jsonDetails = await details.json();
      setMovieDetails(jsonDetails);

      const castData = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const jsonCast = await castData.json();
      setCastDetails(jsonCast);
    } catch (error) {
      console.error("Failed to fetch: movie-details, cast:", error);
    }
  };

  const getSearchData = async (input) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${input}&page=${searchPage}`
      );
      const searchJson = await data.json();
      setSearchData({ results: searchJson.results, query: input });
      setSearchTotalPages(searchJson.total_pages || 1);
    } catch (error) {
      console.error("Failed to fetch: search-data:", error);
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      getMovieData();
    }
  }, [listType, page, isSearchMode]);

  useEffect(() => {
    if (isSearchMode) {
      getSearchData(searchData.query);
    }
  }, [searchPage, isSearchMode]);

  return (
    <MovieContext.Provider
      value={{
        movieData,
        listType,
        setListType,
        movieDetails,
        setMovieDetails,
        getMovie,
        castDetails,
        searchData,
        getSearchData,
        setSearchData,
        page,
        setPage,
        totalPages,
        searchPage,
        setSearchPage,
        searchTotalPages,
        isSearchMode,
        setIsSearchMode,
        isSearchActive,
        setIsSearchActive,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
