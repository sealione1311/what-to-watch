import React from 'react';
import renderer from 'react-test-renderer';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space.js';
import {AuthorizationStatus} from "../../redux/user/user.js";
import Header from "./header.jsx";
import {Router} from "react-router-dom";
import history from '../../history';

const mockStore = configureStore([]);

it(`Header component render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      film,
      films,
      isLoading: false,
      isErrorLoading: false,
    },
    [NameSpace.APP_STATE]: {
      activeGenre: `All genres`,
      currentMovie: film,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      isErrorAuth: false,
      userInfo: {
        id: 1,
        email: `me@gmail.com`,
        name: `12345`,
        avatarUrl: `https://4.react.pages.academy/wtw/me.jpg`,
      }
    },
  });
  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            onSignInClick={() => {}}
          /></Provider></Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
