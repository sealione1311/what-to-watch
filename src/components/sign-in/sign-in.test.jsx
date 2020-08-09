import React from "react";
import renderer from "react-test-renderer";
import NameSpace from "../../redux/name-space.js";
import SignIn from "./sign-in.jsx";
import configureStore from "redux-mock-store";
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";


const mockStore = configureStore([]);

it(`Should render SignIn correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: film,
      films,
      isLoading: false,
      isErrorLoading: false,
    },
    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      currentMovie: null,
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
          <SignIn
            onFormSubmit={() => {}}
            isErrorAuth={true}
          /> </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
