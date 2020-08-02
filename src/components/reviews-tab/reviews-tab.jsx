import React from "react";
import PropTypes from "prop-types";

const ReviewsTab = (props) => {
  const reviews = props.reviews;
  const sliceIndex = Math.ceil(reviews.length / 2);
  const leftColReviews = reviews.slice(0, sliceIndex);
  const rightColReviews = reviews.slice(sliceIndex, reviews.length);


  return (<React.Fragment>
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {leftColReviews.map((review) => {
          const {id, text, author, rating, date} = review;
          return (
            <div className="review" key = {id}>
              <blockquote className="review__quote">
                <p className="review__text">{text}</p>
                <footer className="review__details">
                  <cite className="review__author">{author}</cite>
                  <time className="review__date" dateTime="2016-12-24">{date}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{rating}</div>
            </div>);
        })
        }
      </div>
      <div className="movie-card__reviews-col">
        {rightColReviews.map((review) => {
          const {id, text, author, rating, date} = review;
          return (
            <div className="review" key = {id}>
              <blockquote className="review__quote">
                <p className="review__text">{text}</p>
                <footer className="review__details">
                  <cite className="review__author">{author}</cite>
                  <time className="review__date" dateTime="2016-12-24">{date}</time>
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

export default ReviewsTab;
