import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCardSmall from "../movie-card-small/movie-card-small.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {ActionCreator} from "../../redux/reducer.js";
import {connect} from "react-redux";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
  }

  render() {
    const {films, displayedFilmsCount, onShowMoreButtonClick} = this.props;
    const onSmallCardClick = this.props.onSmallCardClick;
    const moviesList = films.slice(0, displayedFilmsCount).map((movie, i) => {
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
  onSmallCardClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  displayedFilmsCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displayedFilmsCount: state.displayedFilmsCount
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.increaseDisplayedFilmsCount());
  }
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
