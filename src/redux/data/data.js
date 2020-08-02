import ActionType from "../action-types.js";
import {adapterMovie} from "../../utils/adapter.js";

const initialState = {
  movie: {},
  films: []
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
};

const Operation = {
  getMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.getMovie(adapterMovie(response.data)));
      });
  },
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const movies = response.data.map((movie) => adapterMovie(movie));
        dispatch(ActionCreator.getMovies(movies));
      });
  }
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
  }
  return state;
};

export {ActionType, ActionCreator, Operation, reducer, initialState};
