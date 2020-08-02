import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space';

const mockStore = configureStore([]);

const onTitleClick = () => {};
const onSmallCardClick = () => {};

describe(`Render App`, () => {
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
