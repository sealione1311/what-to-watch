import React from "react";
import renderer from "react-test-renderer";
import MoreLikeThis from "./more-like-this.jsx";
import films from "../../mocks/films.js";

const onSmallCardClick = () => {};

describe(`Render MoreLikeThis`, () => {
  it(`Render MoreLikeThis`, () => {
    const tree = renderer
    .create(<MoreLikeThis
      filteredMovies = {films}
      onSmallCardClick={onSmallCardClick}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
