import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../redux/state/state.js";
import {connect} from "react-redux";
import history from "../../history.js";

const FullScreenPlayer = (props) => {
  const {
    movieCard,
    isPlaying,
    onPlayButtonClick,
    onFullScreenButtonClick,
    getPlaybackProgress,
    getRestOfTime,
    children,
  } = props;

  return (
    <div className="player">
      {children}
      <button
        type="button"
        className="player__exit"
        onClick={() => history.goBack()}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={getPlaybackProgress()}
              max="100"
            />
            <div
              className="player__toggler"
              style={{left: `${getPlaybackProgress()}%`}}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{getRestOfTime()}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayButtonClick}
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
            <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">{movieCard.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenButtonClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FullScreenPlayer.propTypes = {
  movieCard: PropTypes.shape({
    name: PropTypes.string,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  getRestOfTime: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  getPlaybackProgress: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onExitButtonClick() {
    dispatch(ActionCreator.changePlayingMovie(null));
  }
});

export {FullScreenPlayer};
export default connect(null, mapDispatchToProps)(FullScreenPlayer);
