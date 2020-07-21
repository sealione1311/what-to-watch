import {reducer} from "./reducer.js";
import films from "../mocks/films.js";
import film from "../mocks/film.js";
import ActionType from "./action-types.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    displayedFilmsCount: 8,
    filmsByGenre: films,
    movie: film,
    films
  });
});

it(`Reducer should change current genre `, () => {
  expect(reducer({
    currentGenre: `All genres`,
    displayedFilmsCount: 8,
    filmsByGenre: films,
    movie: film,
    films
  }, {
    type: ActionType.SET_CURRENT_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    displayedFilmsCount: 8,
    filmsByGenre: films,
    movie: film,
    films
  });
});

it(`Reducer should change displayed films count `, () => {
  expect(reducer({
    currentGenre: `All genres`,
    displayedFilmsCount: 8,
    filmsByGenre: films,
    movie: film,
    films
  }, {
    type: ActionType.INCREASE_DISPLAYED_FILMS_COUNT,
    payload: 8,
  })).toEqual({
    currentGenre: `All genres`,
    displayedFilmsCount: 16,
    filmsByGenre: films,
    movie: film,
    films
  });
});
