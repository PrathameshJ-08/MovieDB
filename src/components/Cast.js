import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { MOVIE_POSTER_IMG, Profile } from "../utils/constants";

const Cast = () => {
  const { castDetails } = useContext(MovieContext);

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-yellow-200 text-3xl font-bold mb-4 border-b-4">
        Cast
      </h2>
      <ul className="grid grid-cols-4 gap-8">
        {castDetails &&
          castDetails?.cast.map((actor) => (
            <li key={actor.id} className="flex items-center">
              {actor.profile_path ? (
                <img
                  src={`${MOVIE_POSTER_IMG}${actor.profile_path}`}
                  alt={actor.name}
                  className="h-48 w-36 object-cover rounded-lg"
                />
              ) : (
                <div className="h-48 w-36 object-cover rounded-lg bg-gray-300 flex items-center justify-center">
                  <Profile />
                </div>
              )}
              <div className="ml-4 text-white">
                <p className="text-lg font-bold">{actor.name}</p>
                <p className="text-sm">as {actor.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Cast;
