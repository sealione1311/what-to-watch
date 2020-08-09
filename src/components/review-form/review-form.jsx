import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {RATING_COUNT, ReviewLength, AppRoute} from "../../utils/const.js";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getUserInfo} from "../../redux/user/selectors.js";


const ReviewForm = ({movie, onFormSubmit, onCommentChange, onRatingChange, isDataSending, isValid, isErrorLoading, user}) => {
  const {backgroundColor, backgroundImage, name, poster, id: movieID} = movie;
  const isDisabled = !isValid || isDataSending;

  const getRatingItem = (item, index) => {

    const key = `star-${index + 1}`;

    return (
      <Fragment key={key}>
        <input
          onChange={onRatingChange}
          className="rating__input"
          id={key}
          type="radio"
          name="rating"
          value={index + 1}
        />
        <label className="rating__label" htmlFor={key}>Rating {index}</label>
      </Fragment>
    );
  };

  const ratingStars = new Array(RATING_COUNT).fill(``);

  const renderRatingMarkup = () => ratingStars.map(getRatingItem);

  const getErrorMessage = () => {
    return isErrorLoading ? (
      <p style={{color: `red`, textAlign: `center`}}>Sending error. Please, try again.</p>
    ) : null;
  };

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor: `${backgroundColor}`}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.CARD}/${movieID}`} className="breadcrumbs__link">
                  {name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src={`${user.avatarUrl}`} alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        <p style={{color: `red`, textAlign: `center`}}>{getErrorMessage()}</p>
        <form action="#" className="add-review__form" onSubmit={onFormSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {renderRatingMarkup()}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              onChange={onCommentChange}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              required
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isDisabled}>Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

ReviewForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  isErrorLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isDataSending: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired
};


const mapStateToProps = (state) => ({
  user: getUserInfo(state)
});

export {ReviewForm};
export default connect(mapStateToProps)(ReviewForm);
