import axios from "axios";

const TIMEOUT = 5000;

const Error = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://6.react.pages.academy/wtw`,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
