import { useEffect } from "react"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import { TimerActions, TimerSelectors } from "src/redux/timer"
const MINUTE_TO_MS = 60000

const useMinuteTick = () => {
  const time = useSelector(TimerSelectors.getMinuteTick)
  const dispatch = useDispatch()
  let interval, timeout
  const beginInterval = () => {
    dispatch(TimerActions.setMinuteTick(moment()))
    interval = setInterval(() => {
      const action = TimerActions.setMinuteTick(moment())
      dispatch(action)
    }, MINUTE_TO_MS)
  }
  useEffect(() => {
    const offsetToNextMinuteInMs = (60 - moment().second()) * 1000
    timeout = setTimeout(beginInterval, offsetToNextMinuteInMs)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])
  return time
}

export default useMinuteTick
