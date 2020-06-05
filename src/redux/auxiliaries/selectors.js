const getMyAuxiliaries = state => {
  const myHelpedUserId = state.auth.user.helped_users[0].id

  return Object.values(state.auxiliary.list).filter(auxiliary =>
    auxiliary.auxiliaries_helped_users.some(
      assignment => assignment.helped_user_id === myHelpedUserId
    )
  )
}

const AuxiliarySelectors = {
  getMyAuxiliaries,
}

export default AuxiliarySelectors
