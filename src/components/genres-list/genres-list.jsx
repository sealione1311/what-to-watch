import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from "../../redux/state/state.js";
import {ALL_GENRES} from "../../utils/const.js";
import {connect} from "react-redux";
import {getMovies} from "../../redux/data/selectors.js";
import {getActiveGenre} from "../../redux/state/selectors.js";

const getGenreList = (films) => {
  const genres = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...genres];
};

const GenresList = ({currentGenre, onGenreClick, films}) => {
  const genres = getGenreList(films);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        return (<li
          key={genre}
          className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`}>
          <a
            href="#"
            className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onGenreClick(genre, films);
            }}>{genre}</a>
        </li>);
      })}
    </ul>
  );
};

GenresList.propTypes = {
  films: PropTypes.array.isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: getActiveGenre(state),
  films: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
    dispatch(ActionCreator.resetDisplayedFilmsCount());
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
