import { createReducer } from 'reduxsauce';
import { types } from './actions';

const initialState = {
  mode: 'awake',
};

// Reducers
const displaySleep = (state = initialState) => {
  return {...state, mode: 'sleep'};
};

const displayAwake = (state = initialState) => {
  return {...state, mode: 'awake'};
};

export default createReducer(initialState, {
  [types.AWAKE]: displayAwake,
  [types.SLEEP]: displaySleep,
});
