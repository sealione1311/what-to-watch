import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const mockMovie = {
  title: `The Grand Budapest`,
  genre: `Drama`,
  date: `2014`,
};

const films = [
  {
    id: 1,
    name: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`
  },
  {
    id: 2,
    name: `Avatar`,
    src: `img/avatar.jpg`
  },
  {
    id: 3,
    name: `Aviator`,
    src: `img/aviator.jpg`
  },
  {
    id: 4,
    name: `No Country for Old Men`,
    src: `img/no-country-for-old-men.jpg`
  },
  {
    id: 5,
    name: `Seven Years in Tibet`,
    src: `img/seven-years-in-tibet.jpg`
  },
  {
    id: 6,
    name: `War of the Worlds`,
    src: `img/war-of-the-worlds.jpg`
  },
  {
    id: 7,
    name: `Orlando`,
    src: `img/orlando.jpg`
  },
  {
    id: 8,
    name: `Snatch`,
    src: `img/snatch.jpg`
  }
];

const onTitleClick = () => {};

describe(`Render App`, () => {
  it(`Render App`, () => {
    const tree = renderer
    .create(<App
      movie = {mockMovie}
      films = {films}
      onTitleClick = {onTitleClick}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
