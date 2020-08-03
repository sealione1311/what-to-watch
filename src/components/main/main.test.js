import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space';

const mockStore = configureStore([]);
const onTitleClick = () => {};
const onSmallCardClick = () => {};

describe(`Render Main`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: film,
      films
    },

    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      playingMovie: null,
      currentSmallMovie: null,
      displayedFilmsCount: 8,
    }
  });
  it(`Render Main`, () => {
    const tree = renderer
    .create(<Provider store={store}>
      <Main
        movie = {film}
        films = {films}
        onTitleClick = {onTitleClick}
        onSmallCardClick={onSmallCardClick}
        onPlayButtonClick = {() => {}}
      /></Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
