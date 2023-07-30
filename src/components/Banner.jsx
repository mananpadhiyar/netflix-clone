import React, { useEffect, useState } from "react";
import requests from "../Request";
import axios from "axios";
import "../banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  let base_url = "https://api.themoviedb.org/3";

  const fetchMovieData = async () => {
    const { data } = await axios.get(base_url + requests.fetchNetflixOrignals);

    setMovie(data.results[Math.floor(Math.random() * data.results.length - 1)]);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  // console.log(movie)

  let truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* background image */}

        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* 2 btn */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/* description */}

        <h1 className="banner__description">{truncate(movie.overview, 150)}</h1>

        <div className="banner__fadeButton"></div>
      </div>
    </header>
  );
};

export default Banner;
