import history from '../../history';
import {createUser} from "../../utils/adapter.js";
const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};
const initialState = {
  userInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isErrorAuth: false
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHECK_ERROR_AUTHORIZATION: `CHECK_ERROR_AUTHORIZATION`,
  GET_USER_DATA: `GET_USER_DATA`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  checkErrorAuthorization: (error) => {
    return {
      type: ActionType.CHECK_ERROR_AUTHORIZATION,
      payload: error,
    };
  },
  getUserData: (userData) => {
    return {
      type: ActionType.GET_USER_DATA,
      payload: userData,
    };
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.CHECK_ERROR_AUTHORIZATION:
      return Object.assign({}, state, {
        isErrorAuth: action.payload,
      });
    case ActionType.GET_USER_DATA:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
  }
  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUserData(createUser(response.data)));
        dispatch(ActionCreator.checkErrorAuthorization(false));

      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
        dispatch(ActionCreator.checkErrorAuthorization(true));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUserData(createUser(response.data)));
        history.goBack();
      });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
