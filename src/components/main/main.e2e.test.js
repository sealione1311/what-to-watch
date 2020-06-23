import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

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

describe(`Simulate title click`, () => {
  it(`Simulate title click`, () => {
    const onTitleClick = jest.fn();
    const onMouseOver = jest.fn();
    const main = shallow(
        <Main
          movie={mockMovie}
          films = {films}
          onTitleClick={onTitleClick}
          onMouseOver={onMouseOver}
        />
    );

    const moviesTitles = main.find(`small-movie-card__link`);
    const movies = main.find(`small-movie-card catalog__movies-card`);

    moviesTitles.forEach((title) => {
      title.simulate(`click`);
    });

    movies.forEach((movie) => {
      movie.simulate(`mouseover`);
    });

    expect(onMouseOver).toHaveBeenCalledTimes(movies.length);
    expect(onTitleClick).toHaveBeenCalledTimes(moviesTitles.length);
  });
});

