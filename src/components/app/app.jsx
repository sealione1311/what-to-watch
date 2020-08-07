import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Route, Switch, Router} from 'react-router-dom';
import Main from "../main/main.jsx";
import MovieCard from '../movie-card/movie-card.jsx';
import reviews from '../../mocks/reviews.js';
import {connect} from "react-redux";
import {Tab, AppRoute} from "../../utils/const.js";
import {ActionCreator} from "../../redux/state/state.js";
import withActiveItem from "../../hocs/with-active-item.js";
import withFullScreenPlayer from "../../hocs/with-full-screen-player.js";
import FullScreenPlayer from "../../components/full-screen-player/full-screen-player.jsx";
import {getMovie, getFilteredMoviesByGenre} from "../../redux/data/selectors.js";
import {getCurrentSmallMovie, getPlayingMovie, getSignInStatus} from "../../redux/state/selectors.js";
import {getErrorAuthorizationStatus, getAuthorizationStatus} from "../../redux/user/selectors.js";
import {Operation as UserOperation} from "../../redux/user/user.js";
import SignIn from "../sign-in/sign-in.jsx";
import MyList from "../../components/my-list/my-list.jsx";
import history from "../../history.js";
import PrivateRoute from "../../private-route.js";
const MovieCardWithTabs = withActiveItem(MovieCard);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {login, isErrorAuth} = this.props;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={() => {
              return <Main
                movie={this.props.movie}
                films = {this.props.films}
              />;
            }}
          />
          <Route exact path={`${AppRoute.CARD}/:id`}
            render={({match}) => {
              return <MovieCardWithTabs
                propId={Number(match.params.id)}
                activeItem = {Tab.OVERVIEW}
                reviews = {reviews}
                films = {this.props.films}
              />;
            }}
          />
          <Route exact path={`${AppRoute.PLAYER}/:id`}
            render={({match}) => {
              return <FullScreenPlayerWrapped
                propId={Number(match.params.id)}
                isPlaying = {true}/>;
            }}
          />
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render = {() => {
              return (
                <MyList />
              );
            }}>
          </PrivateRoute>
          <Route exact path={AppRoute.LOGIN}
            render={() => {
              return <SignIn
                onFormSubmit={login}
                isErrorAuth={isErrorAuth}
              />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  films: getFilteredMoviesByGenre(state),
  movie: getMovie(state),
  selectedSmallMovie: getCurrentSmallMovie(state),
  playingMovie: getPlayingMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  signInPage: getSignInStatus(state),
  isErrorAuth: getErrorAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(ActionCreator.renderMainPage());
  },

  playButtonClickHandler(movie) {
    dispatch(ActionCreator.changePlayingMovie(movie));
  }
});

App.propTypes = {
  signInPage: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  movie: PropTypes.object.isRequired,
  isErrorAuth: PropTypes.bool.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
