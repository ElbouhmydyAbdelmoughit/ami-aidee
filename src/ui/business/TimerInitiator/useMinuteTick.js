import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { TimerActions, TimerSelectors } from 'src/store/timer'

/**
 * Set this to true to "accelerate" time for easier debugging
 */
const DEBUG = false

const MINUTE_TO_MS = DEBUG ? 1000 : 60000

let acc = 0
const getTimeNow = () => {
  acc += 1
  return DEBUG ? moment().add(acc * 30, 'minutes') : moment()
}

const getOffsetToNextMinuteToMs = () => {
  return DEBUG ? 0 : (60 - moment().second()) * 1000
}

const useMinuteTick = () => {
  const time = useSelector(TimerSelectors.getMinuteTick)
  const dispatch = useDispatch()
  let interval
  let timeout
  const beginInterval = () => {
    dispatch(TimerActions.setMinuteTick(getTimeNow()))
    interval = setInterval(() => {
      const action = TimerActions.setMinuteTick(getTimeNow())
      dispatch(action)
    }, MINUTE_TO_MS)
  }
  useEffect(() => {
    const offsetToNextMinuteInMs = getOffsetToNextMinuteToMs()
    timeout = setTimeout(beginInterval, offsetToNextMinuteInMs)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])
  return time
}

export default useMinuteTick
