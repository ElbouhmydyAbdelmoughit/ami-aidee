import { connect } from 'react-redux'
import SleepScreen from './SleepScreen'

const mapStateToProps = ({ auth }) => ({
  auth: auth,
})

export default connect(mapStateToProps, undefined)(SleepScreen)
