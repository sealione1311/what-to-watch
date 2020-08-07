import React from 'react';
import renderer from 'react-test-renderer';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space';
import {AuthorizationStatus} from "../../redux/user/user.js";
import Header from "./header.jsx";

const mockStore = configureStore([]);

it(`Header component render correctly`, () => {
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
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    }
  });
  const tree = renderer.create(<Provider store={store}>
    <Header
      authorizationStatus={AuthorizationStatus.NO_AUTH}
      onSignInClick={() => {}}
    /></Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
