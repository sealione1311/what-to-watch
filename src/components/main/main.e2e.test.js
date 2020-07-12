import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import film from "../../mocks/film.js";
import films from "../../mocks/films.js";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Simulate title click`, () => {
  it(`Simulate title click`, () => {
    const onTitleClick = jest.fn();
    const onMouseOver = jest.fn();
    const onSmallCardClick = jest.fn();
    const main = shallow(
        <Main
          movie={film}
          films = {films}
          onTitleClick={onTitleClick}
          onMouseOver={onMouseOver}
          onSmallCardClick={onSmallCardClick}
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

    movies.forEach((movie) => {
      movie.simulate(`click`);
    });

    expect(onMouseOver).toHaveBeenCalledTimes(movies.length);
    expect(onTitleClick).toHaveBeenCalledTimes(moviesTitles.length);
    expect(onSmallCardClick).toHaveBeenCalledTimes(moviesTitles.length);

  });
});

