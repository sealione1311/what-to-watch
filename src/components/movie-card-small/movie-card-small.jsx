import React from "react";
import PropTypes from "prop-types";

const MovieCardSmall = (props) => {
  const movie = props.movie;
  const {id, smallImage, title} = movie;
  const onTitleClick = props.onTitleClick;
  const onSmallCardClick = props.onSmallCardClick;
  const onCardHover = props.onCardHover;
  return (
    <React.Fragment>
      <article id={id} onMouseOver = {() => onCardHover(movie)}
        onClick={(evt) => {
          evt.preventDefault();
          onSmallCardClick(movie);
        }} className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image">
          <img src={smallImage} alt={title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={onTitleClick}>{title}</a>
        </h3>
      </article>
    </React.Fragment>
  );
};

MovieCardSmall.propTypes = {
  onSmallCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    smallImage: PropTypes.string.isRequired,
  })
};

export default MovieCardSmall;
