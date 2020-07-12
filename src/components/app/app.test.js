import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";

const onTitleClick = () => {};
const onSmallCardClick = () => {};

describe(`Render App`, () => {
  it(`Render App`, () => {
    const tree = renderer
    .create(<App
      movie = {film}
      films = {films}
      onTitleClick = {onTitleClick}
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
