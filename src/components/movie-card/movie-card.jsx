//import the PropTypes library
import PropType from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
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
