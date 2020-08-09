import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsTab from './reviews-tab.jsx';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space.js';


const mockStore = configureStore([]);


describe(`Should render ReviewsTab correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movieReviews: [],
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
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <ReviewsTab
            /></Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
