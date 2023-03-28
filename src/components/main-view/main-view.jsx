import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signnup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  // useEffect(() => {
  //   // myFlix API
  //   fetch("https://myflixdb-0sx9.onrender.com/movies")
  //     .then((response) => response.json())
  //     .then((data) => setMovies(data));
  // }, []); // dependency array

  useEffect(() => {
    if (!token) return;

    fetch("https://myflixdb-0sx9.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, [token]);

  // login
  if (!user) {
    return (
      <>
        <h2>Login</h2>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <br />
        <h2>Signup</h2>
        <SignupView />
      </>
    );
  }
  if (selectedMovie) {
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <button
          onClick={() => {
            {
              setUser(null);
              setToken(null);
            }
          }}
        >
          Logout
        </button>
      </>
    );
  }
  if (movies.length === 0) {
    return (
      <>
        <div>The movie list is empty!!</div>
        <br />
        <button
          onClick={() => {
            {
              setUser(null);
              setToken(null);
            }
          }}
        >
          Logout
        </button>
      </>
    );
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <br />
      <button
        onClick={() => {
          {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};
