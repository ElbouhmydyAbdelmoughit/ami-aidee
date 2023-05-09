import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { TimerActions } from '../../../store/timer'
import useMinuteTick from './useMinuteTick'

const TimerInitiator = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(TimerActions.setMinuteTick(moment().second(0)))
  }, [])
  useMinuteTick()
  return <></>
}

export default TimerInitiator
