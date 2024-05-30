import React, { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { useParams } from "react-router-dom";
import {
  MOVIE_BACKDROP_IMG,
  MOVIE_POSTER_IMG,
  NoImage,
} from "../utils/constants";
import Cast from "../components/Cast";

const MovieDetails = () => {
  const { id } = useParams();
  const { movieDetails, getMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getYear = (date) => {
    return date ? date.split("-")[0] : "";
  };

  return (
    <div className="mt-16 relative">
      {movieDetails?.backdrop_path ? (
        <div className="relative">
          <img
            src={MOVIE_BACKDROP_IMG + movieDetails?.backdrop_path}
            alt={movieDetails?.title}
            className="h-[35rem] w-full object-top object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-300 to-transparent"></div>
        </div>
      ) : (
        <NoImage />
      )}

      <div className="flex p-6 bg-gray-300 relative z-10 rounded-t-xl">
        {movieDetails?.poster_path ? (
          <img
            src={MOVIE_POSTER_IMG + movieDetails?.poster_path}
            alt={movieDetails?.title}
            className="h-[30rem] object-top object-cover mr-6"
          />
        ) : (
          <div className="h-[30rem] w-52">
            <NoImage />
          </div>
        )}

        <div className="flex flex-col text-white">
          <span className="text-4xl font-bold text-yellow-200">
            {movieDetails?.title}
          </span>
          <span className="text-2xl mb-2 text-yellow-100">
            {movieDetails?.tagline}
          </span>
          <div className="flex items-center my-2">
            <span className="text-lg mr-4">
              {getYear(movieDetails?.release_date)}
            </span>
            <span className="text-lg mr-4">
              • {movieDetails?.adult ? "R" : "PG"}
            </span>
            <span className="text-lg">
              •{" "}
              {movieDetails?.runtime
                ? convertRuntime(movieDetails.runtime)
                : ""}
            </span>
          </div>
          <span className="text-lg my-2">
            Rating: {movieDetails?.vote_average}
          </span>

          <p className="my-4 text-lg w-8/12 border-b-4 border-yellow-200 pb-2">
            {movieDetails?.overview}
          </p>

          <div className="my-2">
            <span className="text-lg font-bold">Production Companies: </span>
            <span>
              {movieDetails?.production_companies
                .map((company) => company.name)
                .join(", ")}
            </span>
          </div>
          <div className="my-2">
            <span className="text-lg font-bold">Spoken Languages: </span>
            <span>
              {movieDetails?.spoken_languages
                .map((lang) => lang.english_name)
                .join(", ")}
            </span>
          </div>
          <a
            href={movieDetails?.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="underline mt-4 mb-4 text-yellow-200"
          >
            Official Website
          </a>
          <div className="flex flex-wrap my-1">
            {movieDetails?.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-lg mr-2 mb-2 border-2 border-gray-100 rounded-full px-3 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Cast />
      </div>
    </div>
  );
};

export default MovieDetails;
