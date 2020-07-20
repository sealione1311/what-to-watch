import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from "../movies-list/movies-list.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

describe(`RenderMoviesList`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    displayedFilmsCount: 8,
    filmsByGenre: films,
    movie: film,
    films
  });
  it(`RenderMoviesList`, () => {
    const tree = renderer.create(<Provider store={store}>
      <MoviesList
        films={films}
        onSmallCardClick={() => {}}
      /></Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
