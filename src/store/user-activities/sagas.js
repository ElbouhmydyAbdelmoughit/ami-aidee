import { takeLatest, call, select, put } from 'redux-saga/effects'
import UserActivitiesActions, { types } from './actions'
import { UserActivitiesService } from '../../services'
import { AuthSelectors } from '../auth'

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
