import { connect } from 'react-redux'
import { AuthActions } from 'store/auth'

import SplashScreen from './SplashScreen'

const mapStateToProps = ({ auth }) => ({
  auth,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(AuthActions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
