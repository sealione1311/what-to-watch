import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from '../../redux/name-space.js';

const mockStore = configureStore([]);


describe(`Should render GenresList correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: film,
      films
    },

    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      currentMovie: film,
      displayedFilmsCount: 8,
    }
  });
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<Provider store={store}>
        <GenresList
        /></Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
