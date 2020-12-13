import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import HomeScreen from './HomeScreen'

import { MessageActions } from 'src/store/message'
import { TimerActions } from 'src/store/timer'
import TimerSelectors from '../../../store/timer/selectors'

const mapStateToProps = state => {
  const { auth, message } = state
  return {
    list: message.list,
    me: auth.user,
    loading: message.loading,
    now: TimerSelectors.getMinuteTick(state),
  }
}

const mapDispatchToProps = dispatch => ({
  messagesRequest: filters => dispatch(MessageActions.messagesRequest(filters)),
  awake: () => dispatch(TimerActions.awake()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
