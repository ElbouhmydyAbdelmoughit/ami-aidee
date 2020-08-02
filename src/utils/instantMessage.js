import { AuthSelectors } from 'src/redux/auth'

const getCurrentTopic = auxiliary => state => {
  const currentHelpedUser = AuthSelectors.getCurrentHelpedUser(state)
  const correspondingTopic = auxiliary.auxiliaries_helped_users.find(
    auxiliaryHelpedUser =>
      auxiliaryHelpedUser.helped_user_id === currentHelpedUser.id
  )
  return correspondingTopic
}

export { getCurrentTopic }
