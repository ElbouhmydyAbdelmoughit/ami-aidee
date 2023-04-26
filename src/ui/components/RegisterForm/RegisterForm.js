import React from 'react'
import NameForm from './NameForm'
import PhoneForm from './PhoneForm'
import PasswordForm from './PasswordForm'
import EmailForm from './EmailForm'

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
