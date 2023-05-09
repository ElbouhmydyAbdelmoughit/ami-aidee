import React from 'react'

import BlockerDialog from './BlockerDialog'
import WarningDialog from './WarningDialog'

const AccountChecker = ({ helpedUser, isLoading }) => {
  if (isLoading) {
    return null
  }
  return (
    <>
      <BlockerDialog helpedUser={helpedUser} />
      <WarningDialog helpedUser={helpedUser} />
    </>
  )
}

export default AccountChecker
