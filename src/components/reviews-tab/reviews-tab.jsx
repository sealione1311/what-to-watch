import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {connect} from 'react-redux';
import {getReviews} from "../../redux/data/selectors.js";

const ReviewsTab = (props) => {
  const reviews = props.reviews;
  const sliceIndex = Math.ceil(reviews.length / 2);
  const leftColReviews = reviews.slice(0, sliceIndex);
  const rightColReviews = reviews.slice(sliceIndex, reviews.length);
  const styleWordBreak = {
    wordBreak: `break-all`,
  };

  return (<React.Fragment>
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {leftColReviews.map((review) => {
          const {id, comment, user, rating} = review;
          const date = moment(review.date).format(`MMMM D, YYYY`);
          const dateTime = moment(review.date).format(`YYYY-MM-DD`);
          return (
            <div className="review" key = {id}>
              <blockquote className="review__quote">
                <p className="review__text" style={styleWordBreak}>{comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{user.name}</cite>
                  <time className="review__date" dateTime={dateTime}>{date}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{rating}</div>
            </div>);
        })
        }
      </div>
      <div className="movie-card__reviews-col">
        {rightColReviews.map((review) => {

          const {id, comment, user, rating} = review;
          const date = moment(review.date).format(`MMMM D, YYYY`);
          const dateTime = moment(review.date).format(`YYYY-MM-DD`);
          return (
            <div className="review" key = {id}>
              <blockquote className="review__quote">
                <p className="review__text" style={styleWordBreak}>{comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{user.name}</cite>
                  <time className="review__date" dateTime={dateTime}>{date}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{rating}</div>
            </div>);
        })
        }
      </div>
    </div>
  </React.Fragment>
  );
};

ReviewsTab.propTypes = {
  reviews: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state)
});
export {ReviewsTab};

export default connect(mapStateToProps)(ReviewsTab);

