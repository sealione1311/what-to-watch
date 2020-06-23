import React from 'react';
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onTitleClick = () => {};

const App = (props) => {
  return (
    <Main
      movie={props.movie}
      films = {props.films}
      onTitleClick = {onTitleClick}
    />);
};

App.propTypes = {
  films: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })
};

export default App;
