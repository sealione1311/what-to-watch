import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import films from "../../mocks/films.js";
import film from "../../mocks/film.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);


describe(`Should render GenresList correctly`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    filmsByGenre: films,
    movie: film,
    films
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
