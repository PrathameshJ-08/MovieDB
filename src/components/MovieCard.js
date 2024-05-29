import React from "react";
import { Link } from "react-router-dom";
import { MOVIE_POSTER_IMG, NoImage } from "../utils/constants";

const MovieCard = ({ movieObj }) => {
  const { title, poster_path, overview, vote_average, id } = movieObj;

  return (
    <div className="relative w-60 h-auto transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg overflow-hidden">
      <Link to={`/movie/${id}`}>
        {poster_path ? (
          <img
            className="w-full h-80 object-cover"
            src={MOVIE_POSTER_IMG + poster_path}
            alt={title}
          />
        ) : (
          <NoImage />
        )}
      </Link>
      <div className="absolute inset-0 bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center text-white bg-gray-300">
        <h1 className="text-lg font-semibold text-yellow-200">{title}</h1>
        <p className="text-sm my-2 overflow-hidden h-36">{overview}</p>
        <div className="flex items-center">
          <span className="mr-2">{vote_average}</span>
          <i className="fas fa-star text-yellow-200"></i>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
