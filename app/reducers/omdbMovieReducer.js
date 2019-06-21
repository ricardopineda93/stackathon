import axios from 'axios';

//Initial state of reducer:
const initialState = { selectedMovie: {} };

//Action types:
const GET_MOVIE = 'GET_MOVIE';

//Action creators:
const gotMovie = movie => ({
  type: GET_MOVIE,
  movie
});

//Dispatch methods:
export const fetchMovie = imdbId => {
  return async dispatch => {
    const { data } = await axios.get(`/api/omdb/${imdbId}`);
    dispatch(gotMovie(data));
  };
};

//Reducer for handling a selected movie's data from omdb API:
export const omdbMovieReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_MOVIE:
      newState.selectedMovie = action.movie;
      break;
    default:
      return state;
  }
  return newState;
};
