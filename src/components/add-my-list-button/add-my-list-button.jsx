import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../redux/data/data.js";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import history from "../../history.js";
import {AppRoute} from "../../utils/const.js";
import {AuthorizationStatus} from "../../redux/user/user.js";

const AddMyListButton = ({id, isFavorite, authorizationStatus, onFavoriteButtonClick}) => {

  const handleFavoriteButtonClick = () => {
    return authorizationStatus === AuthorizationStatus.AUTH
      ? onFavoriteButtonClick(id, isFavorite)
      : history.push(AppRoute.LOGIN);
  };

  return (
    <button onClick={() => handleFavoriteButtonClick()} className="btn btn--list movie-card__button" type="button">
      {isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"/>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

AddMyListButton.propTypes = {
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(id, isFavorite) {
    dispatch(DataOperation.sendFavoriteFilm(id, isFavorite));
  }
});

export {AddMyListButton};
export default connect(mapStateToProps, mapDispatchToProps)(AddMyListButton);
