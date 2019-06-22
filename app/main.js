import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from './history';
import Routes from './routes';
import store from './store';
import { Navbar } from './components/index';

render(
  <Provider store={store}>
    <Router history={history}>
      <Navbar />
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('main')
);

//Always remember to select the DOM element to anchor the component onto!!
