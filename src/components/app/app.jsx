import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import MovieCard from '../movie-card/movie-card.jsx';
import reviews from '../../mocks/reviews.js';
import {connect} from "react-redux";
import {Tab} from "../../utils/const.js";
import {ActionCreator} from "../../redux/reducer.js";
import withActiveItem from "../../hocs/with-active-item.js";
import withFullScreenPlayer from "../../hocs/with-full-screen-player.js";
import FullScreenPlayer from "../../components/full-screen-player/full-screen-player.jsx";

const onTitleClick = () => {};
const MovieCardWithTabs = withActiveItem(MovieCard);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  _renderApp() {
    const selectedMovie = this.props.selectedSmallMovie;
    const playingMovie = this.props.playingMovie;
    if (playingMovie) {
      return <FullScreenPlayerWrapped movieCard={playingMovie}
        isPlaying = {true}/>;
    }

    if (selectedMovie) {
      return this._renderMovieCard();
    } else {
      return this._renderMain();
    }
  }

  _renderMain() {
    const smallCardClickHandler = this.props.smallCardClickHandler;
    const playButtonClickHandler = this.props.playButtonClickHandler;
    return (
      <Main
        movie={this.props.movie}
        films = {this.props.films}
        onTitleClick = {onTitleClick}
        onSmallCardClick={smallCardClickHandler}
        onPlayButtonClick={playButtonClickHandler}
      />
    );
  }

  _renderMovieCard() {
    const currentCard = this.props.selectedSmallMovie;
    const smallCardClickHandler = this.props.smallCardClickHandler;
    const playButtonClickHandler = this.props.playButtonClickHandler;
    return (
      <MovieCardWithTabs
        activeItem = {Tab.OVERVIEW}
        movie = {currentCard}
        reviews = {reviews}
        films = {this.props.films}
        onSmallCardClick={smallCardClickHandler}
        onPlayButtonClick={playButtonClickHandler}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/card">
            {this._renderMovieCard()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  films: state.filmsByGenre,
  movie: state.movie,
  selectedSmallMovie: state.currentSmallMovie,
  playingMovie: state.playingMovie,
});

const mapDispatchToProps = (dispatch) => ({
  smallCardClickHandler(movie) {
    dispatch(ActionCreator.setCurrentSmallMovie(movie));
  },
  playButtonClickHandler(movie) {
    dispatch(ActionCreator.changePlayingMovie(movie));
  }
});

App.propTypes = {
  smallCardClickHandler: PropTypes.func.isRequired,
  playButtonClickHandler: PropTypes.func.isRequired,
  selectedSmallMovie: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    ratingCount: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  }),
  playingMovie: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    ratingCount: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
  }),
  films: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    ratingCount: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  })
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
