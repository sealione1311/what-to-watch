import React from "react";
import renderer from "react-test-renderer";
import MoreLikeThis from "./more-like-this.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space.js';
import {Router} from "react-router-dom";
import history from '../../history';

const mockStore = configureStore([]);

describe(`Render MoreLikeThis`, () => {
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
  it(`Render MoreLikeThis`, () => {
    const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoreLikeThis
              filteredMovies = {films}
            /></Provider></Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
