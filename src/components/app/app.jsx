import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import MovieCard from '../movie-card/movie-card.jsx';
import reviews from '../../mocks/reviews.js';
import {connect} from "react-redux";
import {Tab} from "../../utils/const.js";
import {ActionCreator} from "../../redux/state/state.js";
import withActiveItem from "../../hocs/with-active-item.js";
import withFullScreenPlayer from "../../hocs/with-full-screen-player.js";
import FullScreenPlayer from "../../components/full-screen-player/full-screen-player.jsx";
import {getMovie, getFilteredMoviesByGenre} from "../../redux/data/selectors.js";
import {getCurrentSmallMovie, getPlayingMovie, getSignInStatus} from "../../redux/state/selectors.js";
import {Operation as UserOperation} from "../../redux/user/user.js";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import {SignIn} from "../sign-in/sign-in.jsx";


const onTitleClick = () => {};
const MovieCardWithTabs = withActiveItem(MovieCard);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  _renderApp() {
    const {login} = this.props;
    const selectedMovie = this.props.selectedSmallMovie;
    const playingMovie = this.props.playingMovie;
    const signInPage = this.props.signInPage;
    if (signInPage) {
      return <SignIn
        onFormSubmit={login}
      />;
    }
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
  films: getFilteredMoviesByGenre(state),
  movie: getMovie(state),
  selectedSmallMovie: getCurrentSmallMovie(state),
  playingMovie: getPlayingMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  signInPage: getSignInStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(ActionCreator.renderMainPage());
  },
  smallCardClickHandler(movie) {
    dispatch(ActionCreator.setCurrentSmallMovie(movie));
  },
  playButtonClickHandler(movie) {
    dispatch(ActionCreator.changePlayingMovie(movie));
  }
});

App.propTypes = {
  signInPage: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  smallCardClickHandler: PropTypes.func.isRequired,
  playButtonClickHandler: PropTypes.func.isRequired,
  selectedSmallMovie: PropTypes.object,
  playingMovie: PropTypes.object,
  films: PropTypes.array.isRequired,
  movie: PropTypes.object.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
