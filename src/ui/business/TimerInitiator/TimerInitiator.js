import React from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import useMinuteTick from './useMinuteTick'
import { TimerActions } from '../../../store/timer'

const TimerInitiator = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(TimerActions.setMinuteTick(moment().second(0)))
  }, [])
  useMinuteTick()
  return <></>
}

export default TimerInitiator
