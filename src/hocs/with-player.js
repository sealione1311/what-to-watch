import React, {PureComponent} from 'react';

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleSmallMovieCardMouseOver = this._handleSmallMovieCardMouseOver.bind(this);
      this._handleSmallMovieCardMouseOut = this._handleSmallMovieCardMouseOut.bind(this);
    }

    _handleSmallMovieCardMouseOver() {
      this.setState({
        isPlaying: true
      });
    }

    _handleSmallMovieCardMouseOut() {
      this.setState({
        isPlaying: false
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          onSmallMovieCardMouseOver={this._handleSmallMovieCardMouseOver}
          onSmallMovieCardMouseOut={this._handleSmallMovieCardMouseOut}
        />
      );
    }
  }

  return WithPlayer;
};

export default withPlayer;
