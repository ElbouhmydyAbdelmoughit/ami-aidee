import { call, put,select, takeLatest } from 'redux-saga/effects'

import { UserActivitiesService } from '../../services'
import { AuthSelectors } from '../auth'
import UserActivitiesActions, { types } from './actions'

function* activityLogRequest({ eventType }) {
  const currentUserId = yield select(AuthSelectors.getUserId)
  const [error] = yield call(UserActivitiesService.createUserActivity, {
    userId: currentUserId,
    eventType,
  })
  if (!error) {
    yield put(UserActivitiesActions.activityLogRequestSuccess())
  }
}

export default [takeLatest(types.ACTIVITY_LOG_REQUEST, activityLogRequest)]
