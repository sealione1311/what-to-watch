import React from 'react';
import renderer from 'react-test-renderer';
import MovieCardSmall from "./movie-card-small.jsx";

const film = {
  id: 1,
  title: `Bohemian Rhapsody`,
  smallImage: `img/bohemian-rhapsody.jpg`
};

describe(`Render MovieCardSmall`, () => {
  it(`Render MovieCardSmall`, () => {
    const tree = renderer.create(
        <MovieCardSmall
          movie = {film}
          onTitleClick = {() => {}}
          onCardHover = {() => {}}
          onSmallCardClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
