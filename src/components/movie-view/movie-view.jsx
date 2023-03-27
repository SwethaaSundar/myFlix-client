import PropType from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Year:</span>
        <span>{movie.year}</span>
      </div>
      <div>
        <img src={movie.imgUrl} width="250" height="300" />
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre.gName}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director.dName}</span>
        <br />
        <span>Director Bio:</span>
        <span>{movie.director.dBio}</span>
        <br />
        <span>Director Birth:</span>
        <span>{movie.director.dYear}</span>
      </div>
      <button onClick={onBackClick}> Back </button>
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
