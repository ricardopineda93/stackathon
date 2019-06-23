import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, gettingFavorites } from '../reducers/index';
import './auth-formStyle.css';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="loginPageContainer grit">
      <h3 className="greeting">
        {' '}
        {name === 'login' ? 'Log on in.' : 'Sign on up.'}{' '}
      </h3>
      <div className="loginPage">
        <form onSubmit={handleSubmit} name={name} id="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <small>Password:</small>
            </label>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {error && error.response && <small> {error.response.data} </small>}
          <div>
            <button className="btn grit left" type="submit">
              {displayName}
            </button>
            <div className="divider" />
            <a href="/auth/google">
              <button className="btn grit" type="button">
                {displayName} with Google
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
