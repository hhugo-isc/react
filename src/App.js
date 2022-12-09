// import React, { useCallback, useEffect, useState } from "react";

// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMoviesHandler = useCallback(async () => {
//     setIsLoading(true);
//     setError(false);
//     try {
//       const response = await fetch("https://swapi.dev/api/films");
//       if (!response.ok) {
//         throw new Error("Something went wrong");
//       }
//       const data = await response.json();

//       const transformedMovies = data.results.map((movie) => ({
//         id: movie.episode_id,
//         title: movie.title,
//         openingText: movie.opening_crawl,
//         releaseDate: movie.release_date,
//       }));
//       setMovies(transformedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     fetchMoviesHandler();
//   }, [fetchMoviesHandler]);

//   let content = <p>Found no movies</p>;

//   if (movies.length > 0) {
//     content = <MoviesList movies={movies} />;
//   }

//   if (error) {
//     content = <p>Something went wrong</p>;
//   }

//   if (isLoading) {
//     content = <p>Loading</p>;
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
//         {isLoading && <p>Loading</p>}
//         {!isLoading && error && <p>{error}</p>} */}
//         {content}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-f2474-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          ...data[key],
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    // console.log(movie);
    const response = await fetch(
      "https://react-http-f2474-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
