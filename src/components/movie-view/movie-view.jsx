import PropType from "prop-types";
import { Button } from "react-bootstrap";
import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span class="h2">
          <center>{movie.title}</center>
        </span>
      </div>
      <div>
        <span>
          <strong>Description: </strong>
        </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>
          <strong>Year: </strong>
        </span>
        <span>{movie.year}</span>
      </div>
      <br />
      <div>
        <img
          src={movie.imgUrl}
          width="250"
          height="300"
          class="rounded mx-auto d-block"
        />
      </div>
      <br />
      <div>
        <span>
          <strong>Genre: </strong>
        </span>
        <span>{movie.genre.gName}</span>
      </div>
      <div>
        <span>
          <strong>Director: </strong>
        </span>
        <span>{movie.director.dName}</span>
        <br />
        <span>
          <strong>Director Bio: </strong>
        </span>
        <span>{movie.director.dBio}</span>
        <br />
        <span>
          <strong>Director Birth: </strong>
        </span>
        <span>{movie.director.dYear}</span>
      </div>
      <br />
      <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};

MovieView.protoTypes = {
  title: PropType.string.isRequired,
  description: PropType.string.isRequired,
  imgUrl: PropType.string.isRequired,
  year: PropType.string.isRequired,
  genre: PropType.shape({
    gName: PropType.string.isRequired,
    gDescription: PropType.string.isRequired,
  }),
  director: PropType.shape({
    dName: PropType.string.isRequired,
    dBio: PropType.string.isRequired,
    dYear: PropType.string.isRequired,
  }),
  onBackClick: PropType.func.isRequired,
};
