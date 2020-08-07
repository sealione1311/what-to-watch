import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import MovieCardTabs from './../movie-card-tabs/movie-card-tabs.jsx';
import OverviewTab from './../overview-tab/overview-tab.jsx';
import DetailsTab from './../details-tab/details-tab.jsx';
import ReviewsTab from '../reviews-tab/reviews-tab.jsx';
import MoreLikeThis from '../more-like-this/more-like-this.jsx';
import {connect} from "react-redux";
import {Tab} from "../../utils/const.js";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../utils/const.js";
import {getFilteredMoviesByGenre, getCurrentMovieById} from "../../redux/data/selectors.js";
import Header from '../header/header.jsx';

const tabs = Object.values(Tab);

class MovieCard extends PureComponent {
  constructor(props) {

    super(props);

  }

  _renderActiveTabInfo() {
    const {movie, reviews, activeItem} = this.props;

    switch (activeItem) {
      case Tab.OVERVIEW:
        return (<OverviewTab
          movie={movie}
        />);
      case Tab.DETAILS:
        return (<DetailsTab
          movie={movie}
        />);
      case Tab.REVIEWS:
        return (<ReviewsTab
          reviews={reviews}
        />);
      default:
        return (<OverviewTab
          movie={movie}
        />);
    }
  }

  _renderMoreLikeThis(films, currentMovie) {
    const filteredMovies = films.filter((film) => {
      return film.genre === currentMovie.genre && film.name !== currentMovie.name;
    });

    return filteredMovies;
  }

  render() {
    const {movie, films, activeItem, onItemClick} = this.props;
    const {isFavorite} = movie;
    const activeTabInfo = this._renderActiveTabInfo();
    const moviesLikeThis = this._renderMoreLikeThis(films, movie);
    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>
            <Header />
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    className="btn btn--play movie-card__button"
                    to={`${AppRoute.PLAYER}/${movie.id}`}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button"
                    onClick = {() => {}}
                  >{(isFavorite)
                      ?

                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>

                      :

                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>

                    }<span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster} alt={movie.name} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <MovieCardTabs
                  tabs={tabs}
                  activeTab={activeItem}
                  onTabClick={onItemClick}
                />
                {activeTabInfo}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <MoreLikeThis
            filteredMovies={moviesLikeThis}
          />

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>);
  }
}

const mapStateToProps = (state, props) => ({
  films: getFilteredMoviesByGenre(state),
  movie: getCurrentMovieById(state, props),

});

MovieCard.propTypes = {

  onItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,

  films: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    smallImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    isFavorite: PropTypes.bool.isRequired
  })
};

export {MovieCard};
export default connect(mapStateToProps)(MovieCard);

