import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import LoginScreen from './LoginScreen'

import { AuthActions } from '../../../store/auth'

const mapStateToProps = ({ auth }) => ({})

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) =>
    dispatch(AuthActions.loginRequest(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
