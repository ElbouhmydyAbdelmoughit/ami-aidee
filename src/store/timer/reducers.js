import moment from 'moment'
import { createReducer } from 'reduxsauce'
import { types } from './actions'

const initialState = {
  mode: 'awake',
  minute_tick: moment()
    .second(0)
    .toISOString(),
}

// Reducers
const displaySleep = (state = initialState) => {
  return { ...state, mode: 'sleep' }
}

const displayAwake = (state = initialState) => {
  return { ...state, mode: 'awake' }
}

const setMinuteTick = (state = initialState, action) => {
  return { ...state, minute_tick: action.time.toISOString() }
}

export default createReducer(initialState, {
  [types.AWAKE]: displayAwake,
  [types.SLEEP]: displaySleep,
  [types.SET_MINUTE_TICK]: setMinuteTick,
})
