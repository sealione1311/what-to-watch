import ActionType from "../action-types.js";
import {ALL_GENRES, DISPLAYED_FILMS_COUNT} from "../../utils/const.js";

const initialState = {
  currentGenre: ALL_GENRES,
  playingMovie: null,
  currentSmallMovie: null,
  displayedFilmsCount: DISPLAYED_FILMS_COUNT,
};

const ActionCreator = {

  setCurrentGenre: (currentGenre) => {
    return {
      type: ActionType.SET_CURRENT_GENRE,
      payload: currentGenre,
    };
  },

  increaseDisplayedFilmsCount: () => {
    return {
      type: ActionType.INCREASE_DISPLAYED_FILMS_COUNT,
      payload: DISPLAYED_FILMS_COUNT,
    };
  },
  resetDisplayedFilmsCount: () => {
    return {
      type: ActionType.RESET_DISPLAYED_FILMS_COUNT,
      payload: DISPLAYED_FILMS_COUNT,
    };
  },
  setCurrentSmallMovie: (movie) => {
    return {
      type: ActionType.SET_CURRENT_SMALL_MOVIE,
      payload: movie,
    };
  },

  changePlayingMovie: (movie) => {
    return {
      type: ActionType.CHANGE_PLAYING_MOVIE,
      payload: movie,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });

    case ActionType.SET_CURRENT_SMALL_MOVIE:
      return Object.assign({}, state, {
        currentSmallMovie: action.payload,
      });

    case ActionType.INCREASE_DISPLAYED_FILMS_COUNT:
      return Object.assign({}, state, {
        displayedFilmsCount: state.displayedFilmsCount + action.payload,
      });

    case ActionType.RESET_DISPLAYED_FILMS_COUNT:
      return Object.assign({}, state, {
        displayedFilmsCount: action.payload,
      });

    case ActionType.CHANGE_PLAYING_MOVIE:
      return Object.assign({}, state, {
        playingMovie: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator};
