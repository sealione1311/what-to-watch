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

describe(`Simulate title click`, () => {
  it(`Simulate title click`, () => {
    const titleClickHandler = jest.fn();
    const main = shallow(
        <Main
          movie={mockMovie}
          moviesTitles = {mockMoviesTitles}
          titleClickHandler={titleClickHandler}
        />
    );
    const moviesTitles = main.find(`small-movie-card__link`);

    moviesTitles.forEach((title) => {
      title.simulate(`click`);
    });

    expect(titleClickHandler).toHaveBeenCalledTimes(moviesTitles.length);
  });
});
