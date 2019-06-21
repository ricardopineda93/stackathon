import axios from 'axios';

//Initial state of reducer:
const initialState = { allMovies: [] };

//Action types:
const GET_ALL_MOVIES = 'GET_ALL_MOVIES';

//Action creators:
const gotAllMovies = movies => ({
  type: GET_ALL_MOVIES,
  movies
});

//Dispatch methods:
export const fetchAllMovies = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/mydb/');
    dispatch(gotAllMovies(data));
  };
};

//Reducer for handling ALL movies from our db:
export const allMoviesReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_ALL_MOVIES:
      newState.allMovies = action.movies;
      break;
    default:
      return state;
  }
  return newState;
};
