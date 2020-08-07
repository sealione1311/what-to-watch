import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => state[NAME_SPACE].authorizationStatus;

export const getErrorAuthorizationStatus = (state) => state[NAME_SPACE].isErrorAuth;

