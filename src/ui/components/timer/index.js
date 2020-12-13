import { connect } from 'react-redux'
import Timer from './Timer'
import { TimerActions } from 'src/store/timer'

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
