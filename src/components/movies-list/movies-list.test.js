import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from "../movies-list/movies-list.jsx";
import films from "../../mocks/films.js";

describe(`RenderMoviesList`, () => {
  it(`RenderMoviesList`, () => {
    const tree = renderer.create(
        <MoviesList
          films={films}
          onSmallCardClick={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
