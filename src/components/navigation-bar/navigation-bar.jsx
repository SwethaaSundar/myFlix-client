import { Navbar, Container, Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="primary" expand={expand} className="mb-3">
          {/* // <Navbar bg="dark" className="mb-3"> */}
          <Container fluid>
            <Navbar.Brand href="#">MyFlix app</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hello!!!, Welcome to MyFlix app
                </Offcanvas.Title>
              </Offcanvas.Header>
              {!user && (
                <>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link as={Link} to="/login">
                        Login
                      </Nav.Link>
                      <Nav.Link as={Link} to="/signup">
                        Sign up
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </>
              )}
              {user && (
                <>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link as={Link} to="/">
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/profile">
                        Profile
                      </Nav.Link>
                      <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </>
              )}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};
