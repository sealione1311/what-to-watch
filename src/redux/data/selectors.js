import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {ALL_GENRES} from "../../utils/const.js";
import {getActiveGenre} from "../state/selectors.js";


export const getMovies = (state) => state[NameSpace.DATA].films;
export const getMovie = (state) => state[NameSpace.DATA].movie;

export const getMoviesGenres = createSelector(
    getMovies,
    (movies) => {
      const genres = new Set(movies.map((movie) => movie.genre));
      return [ALL_GENRES, ...genres];
    }
);

export const getFilteredMoviesByGenre = createSelector(
    getMovies,
    getActiveGenre,
    (movies, activeGenre) => {
      if (activeGenre === ALL_GENRES) {
        return movies;
      } else {
        return movies.filter((movie) => movie.genre === activeGenre);
      }
    }
);

const getMovieById = (movies, id) => {

  return movies.find((movie) => movie.id === id);
};

export const getCurrentMovieById = (state, prop) => {

  return getMovieById(getMovies(state), prop.propId);
};

