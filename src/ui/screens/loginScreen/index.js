import { connect } from 'react-redux'
import LoginScreen from './LoginScreen'

import { AuthActions } from '../../../store/auth'

const mapStateToProps = ({ auth }) => ({})

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password, invalid) =>
    dispatch(AuthActions.loginRequest(username, password, invalid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
