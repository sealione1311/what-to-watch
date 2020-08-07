import React from 'react';
import {connect} from 'react-redux';
import {bool, string, func} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus} from "./redux/user/user.js";
import {getAuthorizationStatus} from "./redux/user/selectors.js";
import {AppRoute} from "./utils/const.js";


const PrivateRoute = (props) => {
  const {authorizationStatus, exact, path, render} = props;

  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (isAuth) {
          return render(routeProps);
        }

        return <Redirect to={`${AppRoute.LOGIN}`} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: string.isRequired,
  exact: bool.isRequired,
  path: string.isRequired,
  render: func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
