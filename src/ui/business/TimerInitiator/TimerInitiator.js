import React, { useEffect } from "react"
import moment from "moment"
import useMinuteTick from "../../hooks/useMinuteTick"
import { useDispatch } from "react-redux"
import { TimerActions } from "../../../redux/timer"

const TimerInitiator = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(TimerActions.setMinuteTick(moment().second(0)))
  }, [])
  const time = useMinuteTick()
  return null
}

export default TimerInitiator
