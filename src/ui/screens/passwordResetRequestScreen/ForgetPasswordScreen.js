import React from 'react'
import { Subheading } from 'react-native-paper'
import ForgetPasswordForm from './ForgetPasswordForm'
import CenterCardLayout from '../../components/layout/CenterCardLayout'

const ForgetPasswordScreen = ({ componentId }) => {
  return (
    <CenterCardLayout>
      <Subheading>
        Veuillez renseigner votre adresse email pour recevoir l'email de
        ré-initialisation de mot de passe.
      </Subheading>
      <ForgetPasswordForm componentId={componentId} />
    </CenterCardLayout>
  )
}

export default ForgetPasswordScreen
