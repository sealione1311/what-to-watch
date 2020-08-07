import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCardSmall from "../movie-card-small/movie-card-small.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import withPlayer from "../../hocs/with-player.js";
import {ActionCreator} from "../../redux/state/state.js";
import {connect} from "react-redux";
import {getDisplayedFilmsCount} from "../../redux/state/selectors.js";
const MovieCardSmallwithPlayer = withPlayer(MovieCardSmall);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, displayedFilmsCount, onShowMoreButtonClick} = this.props;
    const moviesList = films.slice(0, displayedFilmsCount).map((movie, i) => {
      return (
        <MovieCardSmallwithPlayer
          key={movie + i}
          movie={movie}
        />
      );
    });
    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {moviesList}
        </div>
        {films.length > displayedFilmsCount ? <ShowMoreButton
          onShowMoreButtonClick={onShowMoreButtonClick}
        /> : ``}
      </React.Fragment>
    );
  }

}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  displayedFilmsCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displayedFilmsCount: getDisplayedFilmsCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.increaseDisplayedFilmsCount());
  }
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
