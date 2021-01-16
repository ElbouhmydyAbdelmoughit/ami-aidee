import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import SplashScreen from './SplashScreen'
import { AuthActions } from 'store/auth'

const mapStateToProps = ({ auth }) => ({
  auth: auth,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(AuthActions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
