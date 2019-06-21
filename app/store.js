/* eslint-disable no-warning-comments */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export default createStore(
  rootReducer,
  //all of our toys, starting with the redux dev tools on the broswer:
  composeEnhancers(
    //then our middlewares:
    applyMiddleware(
      //allowing us to use axios in our reducer thunks to mesh with our server side code
      thunkMiddleware.withExtraArgument({ axios }),
      //and our favorite - logging middleware! :)
      loggingMiddleware
    )
  )
);
