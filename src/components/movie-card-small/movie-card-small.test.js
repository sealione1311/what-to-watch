import React from 'react';
import renderer from 'react-test-renderer';
import MovieCardSmall from "./movie-card-small.jsx";
import {Router} from 'react-router-dom';
import history from "../../history.js";

const film = {
  id: 1,
  name: `Bohemian Rhapsody`,
  smallImage: `img/bohemian-rhapsody.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

describe(`Render MovieCardSmall`, () => {
  it(`Render MovieCardSmall`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MovieCardSmall
            isPlaying = {true}
            movie = {film}
            onSmallMovieCardMouseOver={() => {}}
            onSmallMovieCardMouseOut={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
