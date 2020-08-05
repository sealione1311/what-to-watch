import React from "react";
import PropTypes from "prop-types";

const OverviewTab = (props) => {
  const {movie} = props;

  const getRatingLevel = (rating) => {
    if (rating < 3) {
      return `Bad`;
    } else if (rating < 5) {
      return `Normal`;
    } else if (rating < 8) {
      return `Good`;
    } else if (rating < 10) {
      return `Very good`;
    } else {
      return `Awesome`;
    }
  };

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{movie.rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(movie.rating)}</span>
          <span className="movie-rating__count">{movie.ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{movie.description}</p>

        <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>);
};

OverviewTab.propTypes = {
  movie: PropTypes.object.isRequired
};

export default OverviewTab;
