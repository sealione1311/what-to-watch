import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/const.js";
import {connect} from "react-redux";
import {getUserInfo} from "../../redux/user/selectors.js";
import {getFavoriteFilms} from "../../redux/data/selectors.js";
import {Operation as DataOperation} from "../../redux/data/data.js";
import MoviesList from "../../components/movies-list/movies-list.jsx";

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteMovies} = this.props;
    loadFavoriteMovies();
  }
  render() {
    const {user, favoriteFilms} = this.props;
    return (
      <React.Fragment>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <h1 className="page-title user-page__title">My list</h1>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src={`${user.avatarUrl}`} alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>


            <MoviesList
              films={favoriteFilms}
            />


          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

MyList.propTypes = {
  loadFavoriteMovies: PropTypes.func.isRequired,
  favoriteFilms: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,

  }),
};

const mapStateToProps = (state) => ({
  user: getUserInfo(state),
  favoriteFilms: getFavoriteFilms(state)

});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(DataOperation.getFavoriteFilms());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);

