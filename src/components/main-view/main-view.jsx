import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signnup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Col, Button, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
// import { auto, right } from "@popperjs/core";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
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
    //login
    <Row className="justify-content-md-center">
      {!user ? (
        <Row className="justify-content-md-center">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>MyFlix App</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
          </Navbar>
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
          <Col md={{ span: 3, offset: 3 }}>
            <br />
            <h2>Signup</h2>
            <SignupView />
          </Col>
        </Row>
      ) : // The movie list is empty
      movies.length === 0 ? (
        <Col>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>MyFlix App</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <h2>The movie list is empty</h2>
        </Col>
      ) : // Movie view
      selectedMovie ? (
        <Col>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>MyFlix App</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <br />
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : (
        // Movie card
        <>
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>MyFlix App</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                  <Button
                    onClick={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Button>
                </Navbar.Collapse>
              </Navbar>
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
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
