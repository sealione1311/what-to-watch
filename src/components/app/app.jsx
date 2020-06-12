import React from 'react';
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  return <Main movie={props.movie} />;
};

App.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })
};

export default App;
