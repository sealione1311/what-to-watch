import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from "./movie-card.jsx";

const film = {
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
};

describe(`Render MovieCard`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer.create(
        <MovieCard
          movie = {film}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
