import PropType from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [favoriteMovies, setFavoriteMovies] = useState(
    user.FavMovies ? user.FavMovies : []
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const addFavoriteMovie = (event) => {
    event.preventDefault();
    fetch(
      `https://myflixdb-0sx9.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavMovies);

        localStorage.setItem("user", JSON.stringify(data));
        alert("Added to Favorite movies!");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const deleteFavoriteMovie = (event) => {
    event.preventDefault();
    event.preventDefault();
    fetch(
      `https://myflixdb-0sx9.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(favoriteMovies.filter((favM) => favM !== movie._id));

        localStorage.setItem("user", JSON.stringify(data));
        alert("Deleted from favorite Movies!");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const toggleMovie = () => {
    const favoriteMoviesValues = Object.values(favoriteMovies);
    favoriteMoviesValues.some((favM) => favM === movie._id)
      ? setIsFavorite(true)
      : setFavoriteMovies(false);
  };

  useEffect(() => {
    toggleMovie();
  }, []);

  return (
    <div>
      <div>
        <span class="h2">
          <center>{movie.title}</center>
        </span>
      </div>
      <div>
        <span>
          <strong>Description: </strong>
        </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>
          <strong>Year: </strong>
        </span>
        <span>{movie.year}</span>
      </div>
      <br />
      <div>
        <img
          src={movie.imgUrl}
          width="250"
          height="300"
          class="rounded mx-auto d-block"
        />
      </div>
      <br />
      <div>
        <span>
          <strong>Genre: </strong>
        </span>
        <span>{movie.genre.gName}</span>
      </div>
      <div>
        <span>
          <strong>Director: </strong>
        </span>
        <span>{movie.director.dName}</span>
        <br />
        <span>
          <strong>Director Bio: </strong>
        </span>
        <span>{movie.director.dBio}</span>
        <br />
        <span>
          <strong>Director Birth: </strong>
        </span>
        <span>{movie.director.dYear}</span>
      </div>
      <br />
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
        {!isFavorite && (
          <Button onClick={addFavoriteMovie} variant="success">
            Add to favorite
          </Button>
        )}
        {isFavorite && (
          <Button onClick={deleteFavoriteMovie} variant="danger">
            Remove from Favorite
          </Button>
        )}
      </Link>
      <br />
      <br />
      <h2 className="primary"> Similar Movies</h2>
      <Row>
        {movies
          .filter((m) => m.genre.name === movie.genre.name)
          .map((m) => (
            <Col md={4} key={movie._id} className="h-80">
              <MovieCard movie={m} user={user} token={token} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

MovieView.protoTypes = {
  title: PropType.string.isRequired,
  description: PropType.string.isRequired,
  imgUrl: PropType.string.isRequired,
  year: PropType.string.isRequired,
  genre: PropType.shape({
    gName: PropType.string.isRequired,
    gDescription: PropType.string.isRequired,
  }),
  director: PropType.shape({
    dName: PropType.string.isRequired,
    dBio: PropType.string.isRequired,
    dYear: PropType.string.isRequired,
  }),
  onBackClick: PropType.func.isRequired,
};
