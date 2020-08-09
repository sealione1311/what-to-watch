import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from "../movies-list/movies-list.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space.js';
import {Router} from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

describe(`RenderMoviesList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: film,
      films
    },

    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      currentMovie: film,
      displayedFilmsCount: 8,
    }
  });
  it(`RenderMoviesList`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MoviesList
              films={films}
              onSmallCardClick={() => {}}
            /></Provider></Router>, {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
