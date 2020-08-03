import React from "react";
import renderer from "react-test-renderer";
import MoreLikeThis from "./more-like-this.jsx";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space';

const onSmallCardClick = () => {};
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
