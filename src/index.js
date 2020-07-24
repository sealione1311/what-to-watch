import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app.jsx";
import {reducer} from "./redux/reducer.js";
import {createStore} from "redux";
import {Provider} from "react-redux";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rootElement = document.querySelector(`#root`);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,

    rootElement
);
