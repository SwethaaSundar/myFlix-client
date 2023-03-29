//import the PropTypes library
import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-80">
      <Card.Img variant="top" src="movie.imgUrl" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director : {movie.director.dName}</Card.Text>
        <Card.Text>Genre : {movie.genre.gName}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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
