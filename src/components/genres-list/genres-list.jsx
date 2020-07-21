import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator, ALL_GENRES} from "../../redux/reducer.js";
import {connect} from "react-redux";

const getGenreList = (films) => {
  const genres = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...genres];
};

const filterMoviesByGenre = (allFilms, currentGenre) => {
  if (currentGenre === ALL_GENRES) {
    return allFilms;
  }
  return allFilms.filter((movie) => movie.genre === currentGenre);
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
  currentGenre: state.currentGenre,
  films: state.films
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre, films) {
    dispatch(ActionCreator.setCurrentGenre(genre));
    const filmsByGenre = filterMoviesByGenre(films, genre);
    dispatch(ActionCreator.setFiltredFilmsByGenre(filmsByGenre));
    dispatch(ActionCreator.resetDisplayedFilmsCount());
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
