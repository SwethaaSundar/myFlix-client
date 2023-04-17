import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
// import { Spinner } from "../spinner/spinner";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflixdb-0sx9.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <Card className="card mb-4 ">
      <Card.Body>
        {/* <Card.Title className="mb-4">Login</Card.Title> */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            Username:
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
              placeholder="Username"
              pattern="[a-zA-Z0-9]+"
            />
            <br />
          </Form.Group>
          <Form.Group controlId="formPassword">
            Password:
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              placeholder="Password"
            />
          </Form.Group>
          <br />
          <div className="align-right mt-3">
            {/* {loading ? (
              <Button className="spinner" type="button" variant="primary">
                <Spinner />
              </Button>
            ) : (
              <Button className="spinner" type="submit" variant="primary">
                Login
              </Button>
            )}
          </div> */}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <br />
        <Link to="/signup">Not registered yet? Sign up here.</Link>
      </Card.Body>
    </Card>
  );
};
