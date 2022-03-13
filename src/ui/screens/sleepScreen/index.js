import { connect } from 'react-redux'
import SleepScreen from './SleepScreen'

import { TimerActions } from 'src/store/timer'

const mapStateToProps = ({ auth }) => ({
  auth: auth,
})

const mapDispatchToProps = dispatch => ({
  awake: () => dispatch(TimerActions.awake()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SleepScreen)
