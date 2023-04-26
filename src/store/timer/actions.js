import { createAction } from '../../utils'

// Types
export const types = {
  AWAKE: 'AWAKE',
  SLEEP: 'SLEEP',
  SET_MINUTE_TICK: 'SET_MINUTE_TICK',
}

// Actions
export default {
  awake: () => createAction(types.AWAKE),
  sleep: () => createAction(types.SLEEP),
  setMinuteTick: time => createAction(types.SET_MINUTE_TICK, { time }),
}
