import { useDispatch } from 'react-redux'
import { UserActivitiesActions } from '../../store/user-activities'

const useActivityLog = () => {
  const dispatch = useDispatch()
  const logActivity = eventType => {
    dispatch(UserActivitiesActions.activityLogRequest(eventType))
  }
  return logActivity
}

export default useActivityLog
