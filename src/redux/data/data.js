import ActionType from "../action-types.js";
import {adapterMovie} from "../../utils/adapter.js";
import history from '../../history';

const initialState = {
  movie: {},
  films: [],
  movieReviews: [],
  favoriteFilms: [],
  isLoading: true,
  isLoadError: false,
  isDataSending: false,
  isErrorLoading: false,
  isLoadingFavoriteFilm: false,
};

const ActionCreator = {
  getMovies: (movies) => ({
    type: ActionType.GET_MOVIES,
    payload: movies
  }),
  getMovie: (movie) => ({
    type: ActionType.GET_MOVIE,
    payload: movie
  }),
  finishLoading: () => ({
    type: ActionType.FINISH_LOADING,
    payload: false,
  }),
  catchLoadError: () => ({
    type: ActionType.CATCH_LOAD_ERROR,
    payload: true,
  }),
  getReviews: (reviews) => ({
    type: ActionType.GET_MOVIE_REVIEWS,
    payload: reviews,
  }),
  checkIsDataSending: (isDataSending) => ({
    type: ActionType.CHECK_IS_DATA_SENDING,
    payload: isDataSending,
  }),
  getErrorStatus: (bool) => ({
    type: ActionType.GET_ERROR_STATUS,
    payload: bool
  }),
  getFavoriteFilms: (films) => ({
    type: ActionType.GET_FAVORITE_FILMS,
    payload: films
  }),
  loadingFavoriteFilm: (bool) => ({
    type: ActionType.LOADING_FAVORITE_FILM,
    payload: bool
  }),
};

const Operation = {
  getMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.getMovie(adapterMovie(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const movies = response.data.map((movie) => adapterMovie(movie));
        dispatch(ActionCreator.getMovies(movies));
        dispatch(ActionCreator.finishLoading());
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },
  getMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
      });
  },

  sendReview: (movieId, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.checkIsDataSending(true));
    return api.post(`/comments/${movieId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(Operation.getMovieReviews(movieId));
      dispatch(ActionCreator.getErrorStatus(false));
      history.goBack();
    })
    .catch(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.getErrorStatus(true));
    });
  },
  getFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        if (response.data) {
          const favoriteMovies = response.data.map((favoriteMovie) => adapterMovie(favoriteMovie));
          dispatch(ActionCreator.getFavoriteFilms(favoriteMovies));
        }
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  sendFavoriteFilm: (id, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    dispatch(ActionCreator.loadingFavoriteFilm(true));

    return api.post(`/favorite/${id}/${status}`)
      .then(() => {
        dispatch(ActionCreator.getErrorStatus(false));
        dispatch(ActionCreator.loadingFavoriteFilm(false));
        dispatch(Operation.getMovie());
        dispatch(Operation.getMovies());
        dispatch(Operation.getFavoriteFilms());

      })
      .catch((error) => {
        dispatch(ActionCreator.getErrorStatus(true));
        dispatch(ActionCreator.loadingFavoriteFilm(false));

        throw error;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES:
      return Object.assign({}, state, {
        films: action.payload,
      });
    case ActionType.GET_MOVIE:
      return Object.assign({}, state, {
        movie: action.payload,
      });
    case ActionType.FINISH_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
    case ActionType.CATCH_LOAD_ERROR:
      return Object.assign({}, state, {
        isLoadError: action.payload,
      });
    case ActionType.GET_MOVIE_REVIEWS:
      return Object.assign({}, state, {
        movieReviews: action.payload,
      });
    case ActionType.CHECK_IS_DATA_SENDING:
      return Object.assign({}, state, {
        isDataSending: action.payload,
      });
    case ActionType.CHECK_IS_SENDING_SUCCESSFULL:
      return Object.assign({}, state, {
        isSendingSuccessfull: action.payload,
      });
    case ActionType.CHECK_IS_SENDING_ERROR:
      return Object.assign({}, state, {
        isSendingError: action.payload,
      });
    case ActionType.GET_ERROR_STATUS:
      return Object.assign({}, state, {
        isErrorLoading: action.payload,
      });
    case ActionType.GET_FAVORITE_FILMS:
      return Object.assign({}, state, {
        favoriteFilms: action.payload,
      });
    case ActionType.LOADING_FAVORITE_FILM:
      return Object.assign({}, state, {
        isLoadingFavoriteFilm: action.payload,
      });

  }
  return state;
};

export {ActionType, ActionCreator, Operation, reducer, initialState};
