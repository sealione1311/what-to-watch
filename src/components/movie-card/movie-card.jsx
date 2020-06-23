import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const movie = props.movie;
  const {id, src, name} = movie;
  const onTitleClick = props.onTitleClick;
  const onCardHover = props.onCardHover;
  return (
    <React.Fragment>
      <article id={id} onMouseOver = {() => onCardHover(movie)} className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image">
          <img src={src} alt={name} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={onTitleClick}>{name}</a>
        </h3>
      </article>
    </React.Fragment>
  );
};

MovieCard.propTypes = {
  onCardHover: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })
};

export default MovieCard;
