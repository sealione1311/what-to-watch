import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import VideoPlayer from '../video-player/video-player.jsx';

export default class MovieCardSmall extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }
  render() {
    const movie = this.props.movie;
    const {id, smallImage, name, preview} = movie;
    const onSmallCardClick = this.props.onSmallCardClick;
    const onCardHover = this.props.onCardHover;
    return (
      <Fragment>
        <article id={id}
          onMouseOver = {() => {
            this.setState({
              isPlaying: true,
            });
            onCardHover(id);
          }}
          onMouseOut = {() => {
            this.setState({
              isPlaying: false,
            });
          }}
          onClick={(evt) => {
            evt.preventDefault();
            onSmallCardClick(movie);
          }} className="small-movie-card catalog__movies-card">
          <div className="small-movie-card__image">
            <VideoPlayer
              isPlaying={this.state.isPlaying}
              src={preview}
              poster={smallImage}
            />
          </div>
          <h3 className="small-movie-card__title">
            <a className="small-movie-card__link" href="movie-page.html">{name}</a>
          </h3>

        </article>
      </Fragment>
    );
  }
}

MovieCardSmall.propTypes = {
  onSmallCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    smallImage: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  })
};
