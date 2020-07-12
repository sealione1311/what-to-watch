import React from 'react';
import renderer from 'react-test-renderer';
import MovieCardSmall from "./movie-card-small.jsx";

const film = {
  id: 1,
  name: `Bohemian Rhapsody`,
  smallImage: `img/bohemian-rhapsody.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

describe(`Render MovieCardSmall`, () => {
  it(`Render MovieCardSmall`, () => {
    const tree = renderer.create(
        <MovieCardSmall
          movie = {film}
          onTitleClick = {() => {}}
          onCardHover = {() => {}}
          onSmallCardClick={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
