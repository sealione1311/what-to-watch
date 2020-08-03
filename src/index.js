import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app.jsx";
import reducer from "./redux/reducer.js";
import {Operation} from "./redux/data/data.js";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from "./api.js";
import {composeWithDevTools} from "redux-devtools-extension";

const api = createAPI(() => {});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));


const rootElement = document.querySelector(`#root`);

store.dispatch(Operation.getMovies());
store.dispatch(Operation.getMovie());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,

    rootElement
);
