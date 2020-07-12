import React from "react";
import PropTypes from "prop-types";


const MovieCardTabs = (props) => {
  const {tabs, onTabClick, activeTab} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((tab) => {
          const activeClass = (tab === activeTab ? `movie-nav__item--active` : ``);

          return <li key={tab} className={`movie-nav__item ${activeClass}`}>
            <a href="#" className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                onTabClick(tab);
              }}>
              {tab}
            </a>
          </li>;
        })}
      </ul>
    </nav>);
};


MovieCardTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default MovieCardTabs;
