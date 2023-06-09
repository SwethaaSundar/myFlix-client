import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
    };

    fetch("https://myflixdb-0sx9.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Card className="card mb-4">
      <Card.Body>
        {/* <Card.Title className="mb-4">Sign up here.</Card.Title> */}
        <Form className="mb-4" onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            Username:
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
              placeholder="Username"
            />
          </Form.Group>
          <br />
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
          <Form.Group controlId="formEmail">
            Email:
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
        <Link to="/login" className="mt-2">
          Already registered? Log in here.
        </Link>
      </Card.Body>
    </Card>
  );
};
