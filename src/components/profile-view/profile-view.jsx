import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UpdateProfile } from "./update-profile";
import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
// import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, movie }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  let favMovies = movie.filter((m) => user.FavMovies.includes(m._id));

  return (
    <Container>
      <Row className="mb-5">
        <UserInfo user={user} />
        <UpdateProfile
          storedToken={storedToken}
          storedUser={storedUser}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
      </Row>
      <Row>
        {" "}
        <h2 className="my-3 my-md-5">Favorite Movies </h2>
        {favMovies.map((movie) => (
          <Col md={6} lg={4} key={movie._id} className="mb-3">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
