import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieContext = createContext({});

export const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState({ results: [] });
  const [movieDetails, setMovieDetails] = useState();
  const [castDetails, setCastDetails] = useState();
  const [listType, setListType] = useState("now_playing");
  const [searchData, setSearchData] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { id } = useParams();

  const getMovieData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${listType}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
      );
      const jsonData = await response.json();
      setMovieData(jsonData);
      setTotalPages(jsonData.total_pages || 1);
    } catch (error) {
      console.error("Failed to fetch: movie-data:", error);
    }
  };

  const getMovie = async (id) => {
    try {
      const details = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      );
      const jsonDetails = await details.json();
      setMovieDetails(jsonDetails);

      const castData = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
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
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${input}&page=1`
      );
      const searchJson = await data.json();
      setSearchData(searchJson);
    } catch (error) {
      console.error("Failed to fetch: search-data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [listType, page]);

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
