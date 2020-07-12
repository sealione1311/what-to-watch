import React from 'react';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list.jsx';
const MAX_MOVIES_COUNT = 4;

const MoreLikeThis = (props) => {
  const {filteredMovies, onSmallCardClick} = props;
  const filteredMoviesList = filteredMovies.slice(0, MAX_MOVIES_COUNT);
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <MoviesList
        films={filteredMoviesList}
        onSmallCardClick={onSmallCardClick}
      />
    </section>
  );

};

MoreLikeThis.propTypes = {
  onSmallCardClick: PropTypes.func.isRequired,
  filteredMovies: PropTypes.array.isRequired
};

export default MoreLikeThis;
