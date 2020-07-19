import React from "react";
import renderer from "react-test-renderer";
import MoreLikeThis from "./more-like-this.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const onSmallCardClick = () => {};
const mockStore = configureStore([]);

describe(`Render MoreLikeThis`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
  });
  it(`Render MoreLikeThis`, () => {
    const tree = renderer
    .create(
        <Provider store={store}>
          <MoreLikeThis
            filteredMovies = {films}
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
