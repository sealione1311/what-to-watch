import React from 'react';
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = (props) => {
  return (
    <Main
      movie={props.movie}
      moviesTitles = {props.moviesTitles}
      titleClickHandler = {titleClickHandler}
    />);
};

App.propTypes = {
  moviesTitles: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })
};

export default App;
