import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';
import reviews from '../../mocks/reviews.js';
import films from '../../mocks/films.js';
import film from '../../mocks/film.js';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const onSmallCardClick = () => {};
const mockStore = configureStore([]);

describe(`Render MovieCard`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
  });
  it(`Render MovieCard`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MovieCard
            films={films}
            movie={film}
            reviews={reviews}
            onSmallCardClick={onSmallCardClick}
          /></Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
