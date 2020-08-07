import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";

import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/const.js";

import {AuthorizationStatus} from "../../redux/user/user.js";

const Header = ({authorizationStatus}) => {
  const renderUserBlock = () => {
    return authorizationStatus === AuthorizationStatus.AUTH ?
      <Link to={AppRoute.MY_LIST}>
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </Link>
      : <Link to={AppRoute.LOGIN} className="user-block__link"
      >Sign in</Link>;
  };
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
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


Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired
};


export {Header};
export default connect(mapStateToProps)(Header);
