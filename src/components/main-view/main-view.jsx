import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signnup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Col, Button, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { auto, right } from "@popperjs/core";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch("https://myflixdb-0sx9.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, [token]);

  return (
    <BrowserRouter>
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
                  <Col md={5}>
                    <br />
                    <h2>Signup</h2>
                    <SignupView />
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
                  <Col md={5}>
                    <br />
                    <h2>Login</h2>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
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
                    <Button
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                    <h2>The movie list is empty</h2>
                  </Col>
                ) : (
                  // Movie view
                  <Col md={8}>
                    <Button
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
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
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>
                    <Button
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                    <h2>The movie list is empty</h2>
                  </Col>
                ) : (
                  <>
                    <Row>
                      <Col>
                        <Button
                          onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                          }}
                        >
                          Logout
                        </Button>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col md={5}>
                        <br />
                        <h2>List of Disney princess movies</h2>
                      </Col>
                    </Row>
                    {movies.map((movie) => (
                      <Col key={movie._id} md={4}>
                        <br />
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
