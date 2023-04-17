import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signnup-view/signup-view";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Form, Col, Row } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { auto, right } from "@popperjs/core";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [typedChar, setTypedChar] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://myflixdb-0sx9.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, [token]);

  useEffect(() => {
    if (typedChar && typedChar.length > 0) {
      const searchedMoviesData = movies.filter(
        (m) =>
          m.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              typedChar
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
            ) ||
          m.genre.gName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              typedChar
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
            ) ||
          m.director.dName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              typedChar
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
            )
      );
      setSearchedMovies(searchedMoviesData);
    } else {
      setSearchedMovies([]);
    }
  }, [typedChar]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={(query) => {
          setViewMovies(
            movies.filter((movie) =>
              movie.title.toLowerCase().includes(query.toLowerCase())
            )
          );
        }}
      />
      <br />
      <Row className="justify-content-md-center">
        <Routes>
          {/* signup */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="square border border-primary rounded">
                    <br />
                    <h2>Sign up here</h2>
                    <SignupView />
                    <br />
                  </Col>
                )}
              </>
            }
          />
          {/* login */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="square border border-primary rounded">
                    <br />
                    <h2>Login</h2>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                    <br />
                  </Col>
                )}
              </>
            }
          />
          {/* Empty list */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>
                    <h2>The movie list is empty</h2>
                  </Col>
                ) : (
                  // Movie view
                  <Col md={8}>
                    <br />
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          {/* Movie card */}
          <Route
            path="/"
            element={
              <>
                <Row className="justify-content-md-center">
                  <Col md={5} sm={8}>
                    <br />
                    <h2>List of Disney princess movies</h2>
                  </Col>
                </Row>
                <Row className="justify-content-md-center m-0">
                  <Col md={8} lg={4} className="mb-3 mb-md-5">
                    <Form>
                      <Form.Control
                        type="text"
                        placeholder="Title, Genre or Director"
                        value={typedChar}
                        onChange={(e) => setTypedChar(e.target.value)}
                        className="bg-light shadow-sm"
                      />
                    </Form>
                  </Col>
                </Row>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>
                    <h2>The movie list is empty</h2>
                  </Col>
                ) : (
                  <>
                    {searchedMovies && searchedMovies.length > 0
                      ? searchedMovies.map((movie) => (
                          <Col md={4} lg={3} key={movie._id} className="mb-5">
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                      : movies.map((movie) => (
                          <Col
                            md={4}
                            lg={3}
                            sm={6}
                            key={movie._id}
                            className="mb-5"
                          >
                            <br />
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                  </>
                )}
              </>
            }
          />
          {/* Profile view */}
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  // Profile view
                  <ProfileView
                    user={user}
                    movie={movies}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
