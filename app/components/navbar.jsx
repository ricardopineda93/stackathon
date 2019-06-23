import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, resettingFavorites } from '../reducers/index';
import './navbarStyle.css';

// const pattern = /.+?(?=abc)/;

const Navbar = ({ email, handleLogOut, isLoggedIn }) => (
  <div id="container">
    <header>
      <Link to="/">
        <h1 className="first">nyscene.</h1>
        <h1 className="second">nyscene.</h1>
        <h1 className="third">nyscene.</h1>
      </Link>
      {isLoggedIn ? (
        <div className="nav">
          Welcome back, {/.+?(?=@)/.exec(email)}!{' | '}
          <a href="#" onClick={handleLogOut}>
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
  return { isLoggedIn: !!state.user.id, email: state.user.email };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogOut() {
      dispatch(resettingFavorites());
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
