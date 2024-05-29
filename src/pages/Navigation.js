import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import Search from "../components/Search";

const Navigation = () => {
  const { setListType } = useContext(MovieContext);

  return (
    <div className="z-50 px-12 bg-gray-300 bg-opacity-95 fixed top-0 w-full flex justify-between shadow-md text-yellow-200 h-16">
      <div className="flex items-center">
        <span className="flex flex-wrap items-center">
          <Link to="/" className="px-2 sm:px-4 hover:text-yellow-100 font-bold">
            Movie DB
          </Link>
        </span>
      </div>
      <div className="flex items-center">
        <ul className="flex flex-wrap items-center">
          <li className="px-4 hover:text-yellow-100 font-bold">
            <Link to="/movies/popular" onClick={() => setListType("popular")}>
              Popular
            </Link>
          </li>
          <li className="px-4 hover:text-yellow-100 font-bold">
            <Link
              to="/movies/top_rated"
              onClick={() => setListType("top_rated")}
            >
              Top Rated
            </Link>
          </li>
          <li className="px-4 hover:text-yellow-100 font-bold">
            <Link to="/movies/upcoming" onClick={() => setListType("upcoming")}>
              Upcoming
            </Link>
          </li>
          <li>
            <Search />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
