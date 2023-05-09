import { connect } from 'react-redux'

import { AuthActions } from '../../../store/auth'
import LoginScreen from './LoginScreen'

const mapStateToProps = ({ auth }) => ({})

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password, invalid) =>
    dispatch(AuthActions.loginRequest(username, password, invalid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
