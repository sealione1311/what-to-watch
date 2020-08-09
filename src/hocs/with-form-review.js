import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Operation as DataOperation} from "../redux/data/data.js";
import {RATING_DEFAULT} from "../utils/const.js";
import {getCurrentMovieById, getIsReviewSending, getErrorStatus} from "../redux/data/selectors.js";

const withFormReview = (Component) => {
  class FormWrapper extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: RATING_DEFAULT,
        comment: null,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value
      });
    }

    _handleCommentChange(evt) {


      this.setState({
        comment: evt.target.value,
      });

    }

    _handleFormSubmit(evt) {
      const {movie, onReviewSubmit} = this.props;
      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      onReviewSubmit(movie.id, review);
    }


    render() {
      const {isDataSending, isErrorLoading} = this.props;
      return (
        <Component
          {...this.props}
          onFormSubmit={this._handleFormSubmit}
          onRatingChange={this._handleRatingChange}
          onCommentChange={this._handleCommentChange}
          isDataSending={isDataSending}
          isValid={Boolean(this.state.comment) && Boolean(this.state.rating > RATING_DEFAULT)}
          isErrorLoading={isErrorLoading}
        />
      );
    }
  }

  FormWrapper.propTypes = {
    movie: PropTypes.object.isRequired,
    isDataSending: PropTypes.bool.isRequired,
    isErrorLoading: PropTypes.bool.isRequired,
    onReviewSubmit: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state, props) => ({
    movie: getCurrentMovieById(state, props),
    isDataSending: getIsReviewSending(state),
    isErrorLoading: getErrorStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, review) {
      dispatch(DataOperation.sendReview(movieId, review));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
};

export default withFormReview;
