import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`,
};

const rootElement = document.querySelector(`#root`);

ReactDOM.render(
    <App
      movie={movie}
      films = {films} />,
    rootElement
);
