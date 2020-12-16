import { useDispatch } from 'react-redux'
import { UserActivitiesActions } from 'store/user-activities'
import { TrackedActivity } from 'core/types'

const useActivityLog = () => {
  const dispatch = useDispatch()
  const logActivity = (eventType: TrackedActivity) => {
    dispatch(UserActivitiesActions.activityLogRequest(eventType))
  }
  return logActivity
}

export default useActivityLog
