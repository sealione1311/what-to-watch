import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

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
    const moviesList = films.map((movie, i) => {
      return (
        <MovieCard
          key={movie + i}
          movie={movie}
          onTitleClick={onTitleClick}
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
  films: PropTypes.array.isRequired,
};

export default MoviesList;
