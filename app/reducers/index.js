import { combineReducers } from 'redux';
import { allMoviesReducer } from './allMoviesReducer';
import { omdbMovieReducer } from './omdbMovieReducer';
import { usersReducer } from './usersReducer';
import { favoritesReducer } from './favoritesReducer';

const rootReducer = combineReducers({
  allMovies: allMoviesReducer,
  omdbMovie: omdbMovieReducer,
  user: usersReducer,
  favorites: favoritesReducer
});

export default rootReducer;
export * from './usersReducer';
export * from './omdbMovieReducer';
export * from './allMoviesReducer';
export * from './favoritesReducer';
