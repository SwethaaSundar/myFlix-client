import { Col, Card } from "react-bootstrap";

export const UserInfo = ({ user }) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Header className="fs-4 fw-bold"> User Information</Card.Header>
          <Card.Text>Username: {user.Username}</Card.Text>
          <Card.Text>Email: {user.Email}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
