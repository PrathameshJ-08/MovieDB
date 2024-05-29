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
  console.log(movieDetails);
  return (
    <div className="mt-16">
      {movieDetails?.backdrop_path ? (
        <img
          src={MOVIE_BACKDROP_IMG + movieDetails?.backdrop_path}
          alt={movieDetails?.title}
          className="h-[35rem] w-full object-top object-cover"
        />
      ) : (
        <NoImage />
      )}

      <div
        className={`absolute bottom-36 text-left w-full p-8 ${
          movieDetails?.backdrop_path
            ? "bg-gradient-to-t from-gray-300 to-transparent"
            : ""
        }`}
      ></div>

      <div className="flex p-6 bg-gray-900  rounded-t-xl">
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
          <span className="text-4xl font-bold">{movieDetails?.title}</span>
          <span className="text-2xl mb-2">{movieDetails?.tagline}</span>
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

          <p className="my-4 text-lg w-5/12 border-b-4 pb-2">
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
            className="underline mt-4  mb-4"
          >
            Official Website
          </a>
          <div className="flex my-1 bottom-0">
            {movieDetails?.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-lg mr-2 border-2 border-gray-100 rounded-full  px-2"
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
