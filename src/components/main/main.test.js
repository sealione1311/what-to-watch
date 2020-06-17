import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
const mockMovie = {
  title: `The Grand Budapest`,
  genre: `Drama`,
  date: `2014`,
};

const mockMoviesTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`, `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
  `Midnight Special`
];

const titleClickHandler = () => {};

describe(`Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
    .create(<Main
      movie = {mockMovie}
      moviesTitles = {mockMoviesTitles}
      titleClickHandler = {titleClickHandler}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
