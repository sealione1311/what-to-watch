import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const onTitleClick = () => {};
const onSmallCardClick = () => {};

describe(`Render App`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
  });
  it(`Render App`, () => {
    const tree = renderer
    .create(<Provider store={store}>
      <App
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
