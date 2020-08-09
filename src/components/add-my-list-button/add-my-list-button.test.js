import React from "react";
import renderer from "react-test-renderer";

import {AddMyListButton} from "./add-my-list-button.jsx";

it(`AddMyListButton component render correctly`, () => {
  const tree = renderer.create(
      <AddMyListButton
        id={1}
        isFavorite={true}
        authorizationStatus={`AUTH`}
        onFavoriteButtonClick={() => {}}
        sendFavoriteFilm={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
