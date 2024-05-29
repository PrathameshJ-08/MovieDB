import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";

import { MovieProvider } from "./context/MovieContext";

import Navigation from "./pages/Navigation";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <MovieProvider>
      <div className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
        <Router>
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movies/:type" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </MovieProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
