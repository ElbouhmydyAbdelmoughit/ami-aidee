import { createAction } from '../../utils'

export const types = {
  ACTIVITY_LOG_REQUEST: 'ACTIVITY_LOG_REQUEST',
  ACTIVITY_LOG_REQUEST_SUCCESS: 'ACTIVITY_LOG_REQUEST_SUCCESS',
}

export default {
  activityLogRequest: eventType => {
    return createAction(types.ACTIVITY_LOG_REQUEST, { eventType })
  },
  activityLogRequestSuccess: () => {
    return createAction(types.ACTIVITY_LOG_REQUEST_SUCCESS)
  },
}
