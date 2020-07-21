import React from 'react';
import PropTypes from "prop-types";

const ShowMoreButton = ({onShowMoreButtonClick}) => {
  return (
    <React.Fragment>
      <div className="catalog__more">
        <button onClick={(evt) => {
          evt.preventDefault();
          onShowMoreButtonClick();
        }} className="catalog__button" type="button">Show more</button>
      </div>
    </React.Fragment>
  );
};

ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired
};


export default ShowMoreButton;
