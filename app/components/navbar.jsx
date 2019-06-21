import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = (
  <div id="container">
    <header>
      <h1 className="first">nyscene.</h1>
      <h1 className="second">nyscene.</h1>
      <h1 className="third">nyscene.</h1>
      <div className="nav" />
    </header>
  </div>
);

const mapStateToProps = state => ({
  //TODO: Navbar mapping state to props for logged in/logged out
});

const mapDispatchToProps = dispatch => ({
  //TODO: Navbar mapping dispatches for logging in/ out/ signing up
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
