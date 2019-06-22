import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, resettingFavorites } from '../reducers/index';
import './navbarStyle.css';

const Navbar = ({ handleLogOut, isLoggedIn }) => (
  <div id="container">
    <header>
      <h1 className="first">nyscene.</h1>
      <h1 className="second">nyscene.</h1>
      <h1 className="third">nyscene.</h1>
      {isLoggedIn ? (
        <div className="nav">
          <a href="#" onClick={handleLogOut} id="brand-name">
            Logout
          </a>
        </div>
      ) : (
        <div className="nav">
          <Link to="login">Log In</Link> | <Link to="signup">Sign Up</Link>
        </div>
      )}
    </header>
  </div>
);

const mapStateToProps = state => {
  return { isLoggedIn: !!state.user.id };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogOut() {
      dispatch(logout());
      dispatch(resettingFavorites());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
