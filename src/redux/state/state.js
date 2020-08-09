import ActionType from "../action-types.js";
import {ALL_GENRES, DISPLAYED_FILMS_COUNT} from "../../utils/const.js";

const initialState = {
  currentGenre: ALL_GENRES,
  currentMovie: null,
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
  setCurrentMovie: (movie) => {
    return {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movie,
    };
  },

  changePlayingMovie: (movie) => {
    return {
      type: ActionType.CHANGE_PLAYING_MOVIE,
      payload: movie,
    };
  },

  renderSignInPage: () => {
    return {
      type: ActionType.RENDER_SIGN_IN_PAGE,
      payload: true,
    };
  },
  renderMainPage: () => {
    return {
      type: ActionType.RENDER_MAIN_PAGE,
      payload: false,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });

    case ActionType.SET_CURRENT_MOVIE:
      return Object.assign({}, state, {
        currentMovie: action.payload,
      });

    case ActionType.INCREASE_DISPLAYED_FILMS_COUNT:
      return Object.assign({}, state, {
        displayedFilmsCount: state.displayedFilmsCount + action.payload,
      });

    case ActionType.RESET_DISPLAYED_FILMS_COUNT:
      return Object.assign({}, state, {
        displayedFilmsCount: action.payload,
      });
    case ActionType.RENDER_SIGN_IN_PAGE:
      return Object.assign({}, state, {
        authScreen: action.payload,
      });
    case ActionType.RENDER_MAIN_PAGE:
      return Object.assign({}, state, {
        authScreen: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator};
