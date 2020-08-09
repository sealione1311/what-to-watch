import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {ALL_GENRES} from "../../utils/const.js";
import {getActiveGenre} from "../state/selectors.js";


export const getMovies = (state) => state[NameSpace.DATA].films;
export const getMovie = (state) => state[NameSpace.DATA].movie;
export const getReviews = (store) => store[NameSpace.DATA].movieReviews;
export const getIsLoading = (state) => state[NameSpace.DATA].isLoading;
export const getIsLoadError = (state) => state[NameSpace.DATA].isLoadError;
export const getErrorStatus = (state) => state[NameSpace.DATA].isErrorLoading;
export const getFavoriteFilms = (state) => state[NameSpace.DATA].favoriteFilms;
export const getLoadingFavoriteFilm = (state) => state[NameSpace.DATA].isLoadingFavoriteFilm;


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

export const getIsReviewSending = (state) => state[NameSpace.DATA].isDataSending;

