import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from './history';
import store from './store';
import Root from './components/root';

render(
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('main')
);

//Always remember to select the DOM element to anchor the component onto!!
