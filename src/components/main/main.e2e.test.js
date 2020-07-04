import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockMovie = {
  bg: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  smallImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `The Grand Budapest Hotel`,
  genre: `Drame`,
  date: `2014`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes).
  Zero, a junior lobby boy, becomes Gustave's friend and protege.Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there.
  When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  rating: `8.9`,
  ratingCount: `740`,
  director: `Wes Anderson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

const films = [
  {
    id: 1,
    name: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 2,
    name: `Avatar`,
    src: `img/avatar.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 3,
    name: `Aviator`,
    src: `img/aviator.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 4,
    name: `No Country for Old Men`,
    src: `img/no-country-for-old-men.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 5,
    name: `Seven Years in Tibet`,
    src: `img/seven-years-in-tibet.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 6,
    name: `War of the Worlds`,
    src: `img/war-of-the-worlds.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 7,
    name: `Orlando`,
    src: `img/orlando.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 8,
    name: `Snatch`,
    src: `img/snatch.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

describe(`Simulate title click`, () => {
  it(`Simulate title click`, () => {
    const onTitleClick = jest.fn();
    const onMouseOver = jest.fn();
    const onSmallCardClick = jest.fn();
    const main = shallow(
        <Main
          movie={mockMovie}
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

