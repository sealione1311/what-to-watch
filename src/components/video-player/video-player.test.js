import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const src = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;
const poster = `img/the-grand-budapest-hotel.jpg`;

it(`VideoPlayer should render correctly`, () => {
  const tree = renderer
      .create(
          <VideoPlayer
            src={src}
            poster={poster}
            isPlaying={false}
          />, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

  expect(tree).toMatchSnapshot();
});
