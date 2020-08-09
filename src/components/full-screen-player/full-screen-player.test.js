import React from 'react';
import renderer from 'react-test-renderer';
import FullScreenPlayer from './full-screen-player.jsx';
import {Router} from "react-router-dom";
import history from '../../history';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../redux/name-space.js";

const videoData = {
  poster: `img/bg-the-grand-budapest-hotel.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/7/72/Landwasserviadukt%2C_aerial_video.webm`,
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
const mockStore = configureStore([]);

describe(`VideoPlayer`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: mockFilm,
      isLoading: false,
      isLoadError: false,
    },
    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      currentMovie: mockFilm,
      displayedFilmsCount: 8,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      isErrorAuth: false,
      userInfo: {
        id: 1,
        email: `me@gmail.com`,
        name: `12345`,
        avatarUrl: `https://4.react.pages.academy/wtw/me.jpg`,
      }
    },
  });
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <FullScreenPlayer
                movieCard = {mockFilm}
                isPlaying={true}
                source={videoData.preview}
                poster={videoData.poster}
                getRestOfTime={() => {}}
                onPlayButtonClick={() => {}}
                onFullScreenButtonClick={() => {}}
                getPlaybackProgress={() => {}}
                onExitButtonClick={() => {}}
              >
                <video />
              </FullScreenPlayer></Provider></Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
