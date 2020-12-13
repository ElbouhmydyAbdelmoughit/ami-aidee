import { connect } from 'react-redux'
import ContactsList from './ContactsList'
import {
  AuxiliarySelectors,
  AuxiliaryActions,
} from '../../../store/auxiliaries'
import {
  InstantMessagesSelectors,
  InstantMessagesActions,
} from '../../../store/instantMessages'

const getHelpedUser = state => {
  const me = state.auth.user

  const helpedUser = me && me.helped_users && me.helped_users[0]
  if (!helpedUser) {
    // this should be the info with fresher data
    // TODO: normalize the store so there is no more need for these types of conditional data retrieval
    return undefined
  }
  return state.user.list[helpedUser.id] || helpedUser
}
const outerConnect = connect(
  state => ({
    auxiliaries: AuxiliarySelectors.getMyAuxiliaries(state),
    loading: state.auxiliary.loading,
    helpedUser: getHelpedUser(state),
  }),
  dispatch => ({
    myAuxiliariesRequest: () =>
      dispatch(AuxiliaryActions.myAuxiliariesRequest()),
  })
)

const hasNewMessagesSelector = (state, { auxiliaries }) =>
  auxiliaries.map(auxiliary =>
    InstantMessagesSelectors.hasNewMessageForAuxiliary(auxiliary)(state)
  )

const innerConnect = connect(
  (state, { auxiliaries }) => ({
    hasNewMessages: hasNewMessagesSelector(state, { auxiliaries }),
  }),
  (dispatch, { auxiliaries }) => ({
    messagesRequest: () =>
      dispatch(
        InstantMessagesActions.lastHelpedUsersMessagesRequest(auxiliaries)
      ),
  })
)

export default outerConnect(innerConnect(ContactsList))
