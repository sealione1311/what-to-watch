import React, {Fragment} from "react";
import PropTypes from "prop-types";
import VideoPlayer from '../video-player/video-player.jsx';
import {AppRoute} from "../../utils/const.js";
import {Link} from "react-router-dom";

const MovieCardSmall = ({movie, onSmallMovieCardMouseOver, onSmallMovieCardMouseOut, isPlaying}) => {
  const {id, smallImage, name, preview} = movie;

  return (
    <Fragment>
      <article id={id}
        onMouseOver = {onSmallMovieCardMouseOver}
        onMouseOut = {onSmallMovieCardMouseOut}
        className="small-movie-card catalog__movies-card">
        <Link to={`${AppRoute.CARD}/${id}`}>
          <div className="small-movie-card__image">
            <VideoPlayer
              isPlaying={isPlaying}
              src={preview}
              poster={smallImage}
            />
          </div>
        </Link>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{name}</a>
        </h3>

      </article>
    </Fragment>
  );
};


MovieCardSmall.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onSmallMovieCardMouseOver: PropTypes.func.isRequired,
  onSmallMovieCardMouseOut: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    smallImage: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  })
};

export default MovieCardSmall;


