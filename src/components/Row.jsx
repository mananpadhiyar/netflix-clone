import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  let base_url = "https://api.themoviedb.org/3";
  let IMG_url = "https://image.tmdb.org/t/p/original/";

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchMovieData = async () => {
    let { data } = await axios.get(base_url + fetchUrl);
    setMovies(data.results);
  };

  //    console.log(movies)

  useEffect(() => {
    fetchMovieData();
    // onload + onUpdate
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {/* title */}
      <div className="row">
        <h2>{title}</h2>

        <div className={`row__posters ${isLargeRow && "row__postersLarge"}`}>
          {movies.map((movie, index) => {
            return (
              <>
                <img
                  key={index}
                  onClick={() => handleClick(movie)}
                  className="row__poster"
                  src={`${IMG_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </>
            );
          })}
        </div>

        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

      {/* container- row */}
    </>
  );
};

export default Row;
