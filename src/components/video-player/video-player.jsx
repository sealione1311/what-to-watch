import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";
const delay = 1000;

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
    this._videoTimer = null;
  }
  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;
    video.src = src;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const isPlaying = this.props.isPlaying;


    if (isPlaying) {
      this._videoTimer = setTimeout(() => video.play(), delay);


    } else {
      video.load();
      clearTimeout(this._videoTimer);
    }

  }

  render() {
    const {poster} = this.props;
    return (
      <Fragment>
        <video ref={this._videoRef} className="video-player" poster={poster} muted="muted" width="280" height="175">
        </video>
      </Fragment>
    );
  }
  componentWillUnmount() {
    const video = this._videoRef.current;
    video.src = ``;
    video.poster = ``;
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  isPlaying: PropTypes.bool,
};

export default VideoPlayer;
