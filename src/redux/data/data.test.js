import MockAdapter from 'axios-mock-adapter';
import {initialState, ActionType, reducer, Operation} from './data';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import reviews from "../../mocks/reviews.js";
import {adapterMovie} from "../../utils/adapter.js";
import {createAPI} from "../../api.js";

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

  it(`Reducer should update reviews by load`, () => {
    expect(reducer({
      movieReviews: [],
    }, {
      type: ActionType.GET_MOVIE_REVIEWS,
      payload: reviews,
    })).toEqual({
      movieReviews: reviews,
    });
  });
  it(`Reducer should catch error on load fail`, () => {
    expect(reducer({
      isLoadError: false,
    }, {
      type: ActionType.CATCH_LOAD_ERROR,
      payload: true,
    })).toEqual({
      isLoadError: true,
    });
  });
  it(`Reducer should add favorite movies to store`, () => {
    expect(reducer({
      favoriteFilms: [],
    }, {
      type: ActionType.GET_FAVORITE_FILMS,
      payload: films,
    })).toEqual({
      favoriteFilms: films,
    });
  });
});
describe(`Operations work correctly`, () => {
  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieCardLoader = Operation.getMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return movieCardLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.GET_MOVIE,
              payload: adapterMovie({fake: true}),
            });
          });
  });
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.getMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.GET_MOVIES,
              payload: [adapterMovie({fake: true})],
            });
          });
  });

});


