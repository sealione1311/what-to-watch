import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';
import reviews from '../../mocks/reviews.js';
import films from '../../mocks/films.js';
import film from '../../mocks/film.js';

const onSmallCardClick = () => {};

describe(`Render MovieCard`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer.create(
        <MovieCard
          films={films}
          movie={film}
          reviews={reviews}
          onSmallCardClick={onSmallCardClick}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
