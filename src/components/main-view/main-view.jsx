import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Snow White and the 7 Dwarfs",
      description:
        "The jealous Evil Queen decided to be rid of Snow White so that she would be fairest in the land, but the spell can be broken by True Love's Kiss.",
      image:
        "https://m.media-amazon.com/images/P/B00GK523GS.01._SCLZZZZZZZ_SX500_.jpg",
      genre: "Fantasy",
      director: "David Dodd Hand",
    },
    {
      id: 2,
      title: "Cinderella",
      description:
        "Cinderella is a dreamer who is trapped within a step-family who doesn't love or appreciate her. Enslaved by her evil stepmother and stepsisters, Cinderella dreams of going to the ball and meeting the Prince. With the help of a few mice friends and her fairy Godmother, Cinderella's dream comes true.",
      image: "https://m.media-amazon.com/images/I/918LXIZ5JWL.jpg",
      genre: "Fantasy",
      director: "Kenneth Charles Branagh",
    },
    {
      id: 3,
      title: "Sleeping Beauty",
      description:
        "When Maleficent curses Princess Aurora at birth, the three good fairies hide her, but one of the faintest hopes is that with true love's kiss, the spell shall break.",
      image:
        "https://m.media-amazon.com/images/I/51xuD6F4LmL._SX412_BO1,204,203,200_.jpg",
      genre: "Animation",
      director: "Wolfgang Reitherman",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The movie list is empty!!</div>;
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
    </div>
  );
};
