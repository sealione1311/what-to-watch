import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);
const onTitleClick = () => {};
const onSmallCardClick = () => {};

describe(`Render Main`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
  });
  it(`Render Main`, () => {
    const tree = renderer
    .create(<Provider store={store}>
      <Main
        movie = {film}
        films = {films}
        onTitleClick = {onTitleClick}
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
