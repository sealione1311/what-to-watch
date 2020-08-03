import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
const Main = (props) => {

  const {name: movieTitle, genre: movieGenre, released: movieDate, poster: moviePoster, backgroundImage: movieBackgroundImage} = props.movie;
  const films = props.films;
  const onTitleClick = props.onTitleClick;
  const onSmallCardClick = props.onSmallCardClick;
  const onPlayButtonClick = props.onPlayButtonClick;
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={movieBackgroundImage} alt={movieTitle} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={moviePoster} alt={movieTitle} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movieTitle}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movieGenre}</span>
                <span className="movie-card__year">{movieDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={(evt) => {
                  evt.preventDefault();
                  onPlayButtonClick(props.movie);
                }} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            films={films}
          />
          <MoviesList
            films={films}
            onTitleClick={onTitleClick}
            onSmallCardClick={onSmallCardClick}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
    </React.Fragment>
  );
};

Main.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  onSmallCardClick: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
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

export default Main;
