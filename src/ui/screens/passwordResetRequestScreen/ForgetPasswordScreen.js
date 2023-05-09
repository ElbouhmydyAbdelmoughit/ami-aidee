import React from 'react'
import { useTranslation } from 'react-i18next'
import { Subheading } from 'react-native-paper'

import CenterCardLayout from '../../components/layout/CenterCardLayout'
import ForgetPasswordForm from './ForgetPasswordForm'

const ForgetPasswordScreen = ({ componentId }) => {
  const { t } = useTranslation()

  return (
    <CenterCardLayout>
      <Subheading>
        {t(
          'screen.forget_password',
          "Veuillez renseigner votre adresse email pour recevoir l'email de ré-initialisation de mot de passe."
        )}
      </Subheading>
      <ForgetPasswordForm componentId={componentId} />
    </CenterCardLayout>
  )
}

export default ForgetPasswordScreen
