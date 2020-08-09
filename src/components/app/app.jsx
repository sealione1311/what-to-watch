import React from 'react';
import PropTypes from "prop-types";
import {Redirect, Route, Switch, Router} from 'react-router-dom';
import Main from "../main/main.jsx";
import MovieCard from '../movie-card/movie-card.jsx';
import {connect} from "react-redux";
import {Tab, AppRoute} from "../../utils/const.js";
import withActiveItem from "../../hocs/with-active-item.js";
import withFullScreenPlayer from "../../hocs/with-full-screen-player.js";
import withFormReview from "../../hocs/with-form-review.js";
import FullScreenPlayer from "../../components/full-screen-player/full-screen-player.jsx";
import {getMovie, getFilteredMoviesByGenre, getIsLoading, getIsLoadError} from "../../redux/data/selectors.js";
import {getErrorAuthorizationStatus, getAuthorizationStatus} from "../../redux/user/selectors.js";
import {AuthorizationStatus, Operation as UserOperation} from "../../redux/user/user.js";
import SignIn from "../sign-in/sign-in.jsx";
import MyList from "../../components/my-list/my-list.jsx";
import LoadingPage from "../../components/loading-page/loading-page.jsx";
import ErrorPage from "../../components/error-page/error-page.jsx";
import ReviewForm from "../../components/review-form/review-form.jsx";
import history from "../../history.js";
import PrivateRoute from "../../private-route.js";

const MovieCardWithTabs = withActiveItem(MovieCard);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);
const AddReviewWithForm = withFormReview(ReviewForm);

const App = ({login, isErrorAuth, isLoading, films, movie, authorizationStatus, isLoadingError}) => {
  if (isLoadingError) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }


  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={() => {
            return !isLoadingError ? <Main
              movie={movie}
              films = {films}
            /> : <ErrorPage />;
          }}
        />
        <Route exact path={`${AppRoute.CARD}/:id`}
          render={({match}) => {
            return <MovieCardWithTabs
              propId={Number(match.params.id)}
              activeItem = {Tab.OVERVIEW}
              films = {films}
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
        <PrivateRoute
          exact path={`${AppRoute.CARD}/:id${AppRoute.REVIEW}`}
          render={({match}) => {
            return <AddReviewWithForm
              propId={Number(match.params.id)}
            />;
          }}
        />
        <Route exact path={AppRoute.LOGIN}
          render={() => {
            return authorizationStatus !== AuthorizationStatus.AUTH ?
              <SignIn
                onFormSubmit={login}
                isErrorAuth={isErrorAuth}
              /> :
              <Redirect
                to={AppRoute.ROOT}
              />;
          }}
        />
        <Route
          render={() => <ErrorPage />}
        />
      </Switch>
    </Router>
  );

};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  movie: PropTypes.object.isRequired,
  isErrorAuth: PropTypes.bool.isRequired,
  isLoadingError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilteredMoviesByGenre(state),
  movie: getMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  isErrorAuth: getErrorAuthorizationStatus(state),
  isLoading: getIsLoading(state),
  isLoadingError: getIsLoadError(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
