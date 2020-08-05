import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import {ActionCreator} from "../../redux/state/state.js";

import {AuthorizationStatus} from "../../redux/user/user.js";

const Header = ({authorizationStatus, onSignInClick}) => {
  const renderUserBlock = () => {
    return authorizationStatus === AuthorizationStatus.AUTH ?
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
      : <a href="sign-in.html" className="user-block__link" onClick={

        (evt) => {
          evt.preventDefault();
          onSignInClick();

        }}>Sign in</a>;
  };
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
      <div className="user-block">
        {renderUserBlock()}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});
const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ActionCreator.renderSignInPage());
  },
});

Header.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};


export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
