import React, { useState } from "react";
import { Button, Form, Row, Col, CardGroup, Card } from "react-bootstrap";
import { Deregister } from "./deregister";

export const UpdateProfile = ({ storedToken, storedUser, onLoggedOut }) => {
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(user.Email);

  const updateUser = (username) => {
    fetch(`https://myflixdb-0sx9.onrender.com/users/${username}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
    };

    fetch(`https://myflixdb-0sx9.onrender.com/users/${storedUser.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // console.log(data);
          alert("Changes saved");
          updateUser(username);
          onLoggedOut();
          // console.log(username);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Col>
      <Card>
        <Card.Body>
          <h4 className="fs-4 fw-bold">Update info</h4>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="forUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </Form.Group>

            <Form.Group controlId="forPassword">
              <Form.Label> Password: </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="forEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>

            <Deregister />
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};
