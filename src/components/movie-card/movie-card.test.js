import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from "../movie-card/movie-card.jsx";

const film = {
  id: 1,
  name: `Bohemian Rhapsody`,
  src: `img/bohemian-rhapsody.jpg`
};

describe(`Render MovieCard`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer.create(
        <MovieCard
          movie = {film}
          onTitleClick = {() => {}}
          onCardHover = {() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
