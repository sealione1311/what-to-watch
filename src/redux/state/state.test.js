import {reducer} from "./state.js";
import ActionType from "../action-types.js";
import films from "../../mocks/films.js";

const initialState = {
  currentGenre: `All genres`,
  currentMovie: null,
  displayedFilmsCount: 8,
};

const mockFilm = {
  id: 1,
  isFavorite: false,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  smallImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  name: `The Grand Budapest Hotel`,
  genre: `Drame`,
  released: 2014,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes).
  Zero, a junior lobby boy, becomes Gustave's friend and protege.Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there.
  When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  rating: 8.9,
  ratingCount: 740,
  director: `Wes Anderson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  runTime: 130,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};


describe(`App State Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Should return right genre when it was changed`, () => {
    expect(reducer({
      currentGenre: `All genres`,
    }, {
      type: ActionType.SET_CURRENT_GENRE,
      payload: `Drama`,
    })).toEqual({
      currentGenre: `Drama`,
    });
  });

  it(`Should return new current movie`, () => {
    expect(reducer({
      currentMovie: mockFilm,
    }, {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: films[1],
    })).toEqual({
      currentMovie: films[1]
    });
  });
});

