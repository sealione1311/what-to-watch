import {reducer} from "./reducer.js";
import films from "../mocks/films.js";
import film from "../mocks/film.js";
import ActionType from "./action-types.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
  });
});

it(`Reducer should change current genre `, () => {
  expect(reducer({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
  }, {
    type: ActionType.SET_CURRENT_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    filmsByGenre: films,
    movie: film,
    films
  });
});
