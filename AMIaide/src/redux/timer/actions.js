import { createAction } from '../../utils';

// Types
export const types = {
  AWAKE: 'AWAKE',
  SLEEP: 'SLEEP',
};

// Actions
export default {
  awake: () =>
    createAction(types.AWAKE),

  sleep: () =>
    createAction(types.SLEEP),
};
