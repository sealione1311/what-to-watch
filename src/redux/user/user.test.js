import MockAdapter from 'axios-mock-adapter';
import {ActionType, ActionCreator, Operation, reducer} from './user';
import {createAPI} from '../../api';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

it(`Reducer without actions should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    userInfo: {
      id: 0,
      email: ``,
      name: ``,
      avatarUrl: ``,
    },
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    isErrorAuth: false
  });
});
it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });
  });
});
describe(`Operations work correctly`, () => {
  it(`Operation should check authorization`, () => {
    const api = createAPI(() => {});

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return checkAuthorization(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(3);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.REQUIRED_AUTHORIZATION,
              payload: `AUTH`,
            });
          });
  });
});
