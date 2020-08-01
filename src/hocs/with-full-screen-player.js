import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {formatMovieDuration} from "../utils/utils.js";
const withFullScreenPlayer = (Component) => {
  class WithFullScreenPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        progress: 0,
        videoDuration: 0,
        isLoading: true,
        isPlaying: this.props.isPlaying,
      };

      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
      this.handleFullScreenButtonClick = this.handleFullScreenButtonClick.bind(this);
      this.getPlaybackProgress = this.getPlaybackProgress.bind(this);
      this.getRestOfTime = this.getRestOfTime.bind(this);

    }

    handlePlayButtonClick() {
      this.setState({isPlaying: !this.state.isPlaying});
    }


    handleFullScreenButtonClick() {
      const video = this._videoRef.current;

      video.requestFullscreen();
    }

    getPlaybackProgress() {
      return String((this.state.progress / this.state.videoDuration) * 100);
    }

    getRestOfTime() {
      return formatMovieDuration(this.state.videoDuration - this.state.progress);

    }

    componentDidMount() {
      const {movieCard} = this.props;
      const video = this._videoRef.current;

      video.src = movieCard.preview;
      video.poster = movieCard.poster;
      video.muted = false;
      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});
      video.onloadedmetadata = () => this.setState({videoDuration: Math.floor(video.duration)});
      video.ontimeupdate = () => this.setState({progress: video.currentTime});
    }

    componentDidUpdate() {
      const video = this._videoRef.current;
      const {isPlaying} = this.state;

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.onload = null;
      video.ontimeupdate = null;
      video.src = ``;
      video.poster = ``;
    }

    render() {
      return (
        <Component
          {...this.props}

          isPlaying = {this.state.isPlaying}
          getRestOfTime = {this.getRestOfTime}
          onPlayButtonClick = {this.handlePlayButtonClick}
          onFullScreenButtonClick = {this.handleFullScreenButtonClick}
          getPlaybackProgress = {this.getPlaybackProgress}
        >
          <video className="player__video" ref={this._videoRef} />
        </Component>
      );
    }
  }

  WithFullScreenPlayer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    movieCard: PropTypes.shape({
      name: PropTypes.string,
      poster: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
    }).isRequired,
  };

  return WithFullScreenPlayer;

};


export default withFullScreenPlayer;

