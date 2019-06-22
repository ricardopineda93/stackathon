import axios from 'axios';

const initialState = [];

// Action Type:
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';
const ADD_USER_FAVORITE = 'ADD_USER_FAVORITE';
const REMOVE_USER_FAVORITE = 'REMOVE_USER_FAVORITE';
const RESET_FAVORITES = 'RESET_FAVORITES';

// Action creators:

const gotFavorites = favorites => ({ type: GET_USER_FAVORITES, favorites });
const addedToFavorites = movie => ({ type: ADD_USER_FAVORITE, movie });
const removedFromFavorites = id => ({ type: REMOVE_USER_FAVORITE, id });
const resettedFavorites = () => ({ type: RESET_FAVORITES });

// Thunks:

export const gettingFavorites = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/favorites');
    dispatch(gotFavorites(data));
  } catch (error) {
    console.error(error);
  }
};

export const addingToFavorites = id => async dispatch => {
  try {
    const { data } = await axios.post('/api/favorites', { movieId: id });
    dispatch(addedToFavorites(data));
  } catch (error) {
    console.error(error);
  }
};

export const removingFromFavorites = id => async dispatch => {
  try {
    await axios.delete(`/api/favorites/${id}`);
    dispatch(removedFromFavorites(id));
  } catch (error) {
    console.error(error);
  }
};

export const resettingFavorites = () => dispatch => {
  try {
    dispatch(resettedFavorites());
  } catch (error) {
    console.error(error);
  }
};

// Favorites reducer:

export const favoritesReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_USER_FAVORITES:
      newState = action.favorites;
      break;
    case ADD_USER_FAVORITE:
      newState.push(action.movie);
      break;
    case REMOVE_USER_FAVORITE:
      newState = newState.filter(favorite => favorite.id !== action.id);
      break;
    case RESET_FAVORITES:
      return initialState;
    default:
      return state;
  }
  return newState;
};
