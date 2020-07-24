import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import MovieCard from '../movie-card/movie-card.jsx';
import reviews from '../../mocks/reviews.js';
import {connect} from "react-redux";
import {Tab} from "../../utils/const.js";
import withActiveItem from "../../hocs/with-active-item.js";

const onTitleClick = () => {};
const MovieCardWithTabs = withActiveItem(MovieCard);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null
    };
    this._smallCardClickHandler = this._smallCardClickHandler.bind(this);
  }

  _renderApp() {
    const {selectedMovie} = this.state;

    if (selectedMovie) {
      return this._renderMovieCard();
    } else {
      return this._renderMain();
    }
  }

  _renderMain() {
    return (
      <Main
        movie={this.props.movie}
        films = {this.props.films}
        onTitleClick = {onTitleClick}
        onSmallCardClick={this._smallCardClickHandler}
      />
    );
  }

  _renderMovieCard() {
    const currentCard = this.state.selectedMovie;
    return (
      <MovieCardWithTabs
        activeItem = {Tab.OVERVIEW}
        movie = {currentCard}
        reviews = {reviews}
        films = {this.props.films}
        onSmallCardClick={this._smallCardClickHandler}
      />
    );
  }

  _smallCardClickHandler(movie) {
    this.setState({
      selectedMovie: movie
    });
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
});

App.propTypes = {
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
export default connect(mapStateToProps)(App);
