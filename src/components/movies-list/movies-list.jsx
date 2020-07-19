import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCardSmall from "../movie-card-small/movie-card-small.jsx";
import {connect} from "react-redux";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
  }

  render() {
    const films = this.props.films;
    const onSmallCardClick = this.props.onSmallCardClick;
    const moviesList = films.map((movie, i) => {
      return (
        <MovieCardSmall
          key={movie + i}
          movie={movie}
          onSmallCardClick={onSmallCardClick}
          onCardHover = {(idActiveCard) => {
            this.setState({
              activeCard: idActiveCard,
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

const mapStateToProps = (state) => ({
  films: state.filmsByGenre
});

MoviesList.propTypes = {
  onSmallCardClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
};

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);
