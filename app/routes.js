import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Root, Login, Signup } from './components/index';
import { me, gettingFavorites, fetchAllMovies } from './reducers/index';

class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.fetchAllMovies();
    if (this.props.isLoggedIn) {
      await this.props.gettingFavorites();
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && prevProps.isLoggedIn === false) {
      await this.props.gettingFavorites();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={Root} />
        {!isLoggedIn && (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        )}
        <Route component={Root} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchAllMovies() {
      dispatch(fetchAllMovies());
    },
    gettingFavorites() {
      dispatch(gettingFavorites());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  gettingFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
