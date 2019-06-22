import axios from 'axios';
import { history } from '../history';

// Initial State:
const defaultUser = {};

// Action types:
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Action creators:
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// Thunk creators:
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/');
  } catch (dispatchHistoryError) {
    console.error(dispatchHistoryError);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (error) {
    console.error(error);
  }
};

// User reducer:
export const usersReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};
