//import the PropTypes library
import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-80 text-center" style={{ width: "20rem" }}>
      <Card.Img variant="top" src={movie.imgUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director : {movie.director.dName}</Card.Text>
        <Card.Text>Genre : {movie.genre.gName}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};
//we define all the props constraints for the MovieCard
MovieCard.protoTypes = {
  movie: PropType.shape({
    title: PropType.string.isRequired,
    description: PropType.string.isRequired,
    imgUrl: PropType.string.isRequired,
    year: PropType.string.isRequired,
    genre: PropType.shape({
      gName: PropType.string.isRequired,
      gDescription: PropType.string.isRequired,
    }).isRequired,
    director: PropType.shape({
      dName: PropType.string.isRequired,
      dBio: PropType.string.isRequired,
      dYear: PropType.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropType.func.isRequired,
};
