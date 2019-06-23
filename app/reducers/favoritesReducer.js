import axios from 'axios';

const initialState = { allFavorites: [], selectedFavorite: {} };

// Action Type:
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';
const ADD_USER_FAVORITE = 'ADD_USER_FAVORITE';
const REMOVE_USER_FAVORITE = 'REMOVE_USER_FAVORITE';
const RESET_FAVORITES = 'RESET_FAVORITES';
const SET_SELECTED_FAVORITE = 'SET_SELECTED_FAVORITE';
const REMOVE_SELECTED_FAVORITE = 'REMOVE_SELECTED_FAVORITE';

// Action creators:

const gotFavorites = favorites => ({ type: GET_USER_FAVORITES, favorites });
const addedToFavorites = movie => ({ type: ADD_USER_FAVORITE, movie });
const removedFromFavorites = id => ({ type: REMOVE_USER_FAVORITE, id });
const resettedFavorites = () => ({ type: RESET_FAVORITES });
const setSelectedFavorite = favorite => ({
  type: SET_SELECTED_FAVORITE,
  favorite
});
const removedSelectedFavorite = () => ({ type: REMOVE_SELECTED_FAVORITE });

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

export const settingSelectedFavorite = favorite => dispatch => {
  try {
    dispatch(setSelectedFavorite(favorite));
  } catch (error) {
    console.error(error);
  }
};

export const removingSelectedFavorite = () => dispatch => {
  try {
    dispatch(removedSelectedFavorite());
  } catch (error) {
    console.error(error);
  }
};

// Favorites reducer:

export const favoritesReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_USER_FAVORITES:
      newState.allFavorites = action.favorites;
      break;
    case ADD_USER_FAVORITE:
      newState.allFavorites.push(action.movie);
      break;
    case REMOVE_USER_FAVORITE:
      newState.allFavorites = newState.allFavorites.filter(
        favorite => favorite.id !== action.id
      );
      break;
    case SET_SELECTED_FAVORITE:
      newState.selectedFavorite = action.favorite;
      break;
    case RESET_FAVORITES:
      return initialState;
    case REMOVE_SELECTED_FAVORITE:
      newState.selectedFavorite = {};
      break;
    default:
      return state;
  }
  return newState;
};
