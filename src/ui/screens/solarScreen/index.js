import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"
import SolarScreen from "./SolarScreen"

import { MessageActions } from "src/redux/message"
import { TimerSelectors } from "src/redux/timer"

const mapStateToProps = ({ auth, message, timer }) => ({
  me: auth.user || {},
  minuteTick: TimerSelectors.getMinuteTick({ timer }),
})

const mapDispatchToProps = dispatch => ({
  messagesRequest: filters => dispatch(MessageActions.messagesRequest(filters)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SolarScreen)
