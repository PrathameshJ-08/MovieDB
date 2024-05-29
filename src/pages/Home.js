import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MOVIE_BACKDROP_IMG } from "../utils/constants";
import Pagination from "../components/Pagination";

const Home = () => {
  const { movieData, listType } = useContext(MovieContext);

  return (
    <main className="pb-5">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
        className="carousel-container"
      >
        {movieData &&
          movieData?.results.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="relative">
                <img
                  src={MOVIE_BACKDROP_IMG + movie.backdrop_path}
                  alt={movie.title}
                  className="h-[40rem] w-full object-top object-cover"
                />
                <div className="absolute bottom-0 text-left w-full p-8 bg-gradient-to-t from-gray-300 to-transparent">
                  <span className="text-white text-4xl font-bold mb-2">
                    {movie.title}
                  </span>
                  <div className="text-white text-lg">
                    {movie.release_date}
                    <span className="ml-4">
                      {movie.vote_average}
                      <i className="fas fa-star text-yellow-200 ml-1" />
                    </span>
                  </div>
                  <p className="text-white italic text-sm mb-4 w-5/12">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>

      <span className="capitalize text-yellow-200 text-4xl font-bold mx-24">
        {listType}
      </span>

      <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center my-5">
        {movieData &&
          movieData.results.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard key={movie.id} movieObj={movie} />
            </Link>
          ))}
      </div>
      <Pagination />
    </main>
  );
};

export default Home;