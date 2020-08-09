import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app.jsx";
import reducer from "./redux/reducer.js";
import {Operation as DataOperation} from "./redux/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./redux/user/user.js";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from "./api.js";
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));


const rootElement = document.querySelector(`#root`);

store.dispatch(DataOperation.getMovie());
store.dispatch(DataOperation.getMovies());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,

    rootElement
);
