import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app.jsx";

const movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`,
};
const moviesTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`, `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
  `Midnight Special`
];

const rootElement = document.querySelector(`#root`);

ReactDOM.render(
    <App
      movie={movie}
      moviesTitles = {moviesTitles} />,
    rootElement
);
