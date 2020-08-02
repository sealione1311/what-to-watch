import MockAdapter from 'axios-mock-adapter';
import {initialState, ActionType, reducer, Operation} from './data';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import {createAPI} from '../../api';
import {adapterMovie} from "../../utils/adapter.js";

const api = createAPI(() => {});

describe(`Data Reducer`, () => {
  it(`Reducer should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update Movie`, () => {
    expect(reducer({
      movie: {},
    }, {
      type: ActionType.GET_MOVIE,
      payload: film,
    })).toEqual({
      movie: film,
    });
  });

  it(`Reducer should update films`, () => {
    expect(reducer({
      films: [],
    }, {
      type: ActionType.GET_MOVIES,
      payload: films,
    })).toEqual({
      films,
    });
  });
});

describe(`Load work correctly`, () => {
  it(`Should load /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieData = Operation.getMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return movieData(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.GET_MOVIE,
              payload: adapterMovie({fake: true}),
            });
          });
  });

  it(`Should load /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.getMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.GET_MOVIES,
              payload: [adapterMovie({fake: true})],
            });
          });
  });

});
