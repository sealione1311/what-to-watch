import films from "../mocks/films.js";
import film from "../mocks/film.js";
import ActionType from "./action-types.js";
const ALL_GENRES = `All genres`;

const initialState = {
  currentGenre: ALL_GENRES,
  filmsByGenre: films,
  movie: film,
  films
};

const ActionCreator = {
  setFiltredFilmsByGenre: (filmsByGenre) => {

    return {
      type: ActionType.SET_FILTRED_FILMS_BY_GENRE,
      payload: filmsByGenre,
    };
  },

  setCurrentGenre: (currentGenre) => {
    return {
      type: ActionType.SET_CURRENT_GENRE,
      payload: currentGenre,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });

    case ActionType.SET_FILTRED_FILMS_BY_GENRE:
      return Object.assign({}, state, {
        filmsByGenre: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, ALL_GENRES};
