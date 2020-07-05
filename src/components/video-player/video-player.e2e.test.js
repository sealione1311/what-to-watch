import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`VideoPlayer should have play state`, () => {
  const {poster, preview} = mock;
  const videoPlayer = mount(
      <VideoPlayer
        src={preview}
        poster={poster}
        isPlaying={true}
      />
  );

  expect(videoPlayer.props().isPlaying).toEqual(true);
});

