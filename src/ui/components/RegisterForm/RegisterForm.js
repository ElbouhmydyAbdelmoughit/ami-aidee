import React from 'react'

import EmailForm from './EmailForm'
import NameForm from './NameForm'
import PasswordForm from './PasswordForm'
import PhoneForm from './PhoneForm'

const STEP_COMPONENT = {
  name: NameForm,
  email: EmailForm,
  phone: PhoneForm,
  password: PasswordForm,
}
const RegisterForm = ({ step, ...otherProps }) => {
  const Component = STEP_COMPONENT[step] || NameForm
  return <Component {...otherProps} />
}

export default RegisterForm
