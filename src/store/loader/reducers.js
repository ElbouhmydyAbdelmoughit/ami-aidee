import { createReducer } from 'reduxsauce';
import { types } from './actions';

const initialState = {
  displayed: false,
};

// Reducers
const displayLoader = (state = initialState) => {
  return {...state, displayed: true};
};

const hideLoader = (state = initialState) => {
  return {...state, displayed: false};
};

export default createReducer(initialState, {
  [types.LOADING]: displayLoader,
  [types.LOADED]: hideLoader,
});
