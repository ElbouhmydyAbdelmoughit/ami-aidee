import moment from 'moment'

const TimerSelectors = {
  getMinuteTick(state) {
    return moment(state.timer.minute_tick)
  },
}

export default TimerSelectors
