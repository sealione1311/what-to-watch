import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCardSmall from "../movie-card-small/movie-card-small.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
  }

  render() {
    const films = this.props.films;
    const onTitleClick = this.props.onTitleClick;
    const onSmallCardClick = this.props.onSmallCardClick;
    const moviesList = films.map((movie, i) => {
      return (
        <MovieCardSmall
          key={movie + i}
          movie={movie}
          onTitleClick={onTitleClick}
          onSmallCardClick={onSmallCardClick}
          onCardHover = {(name) => {
            this.setState({
              activeCard: name,
            });
          }}
        />
      );
    });
    return (
      <React.Fragment>
        {moviesList}
      </React.Fragment>
    );
  }
}

MoviesList.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
  onSmallCardClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
};

export default MoviesList;
