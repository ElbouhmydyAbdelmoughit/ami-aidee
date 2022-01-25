import React from 'react'
import { Subheading } from 'react-native-paper'
import ForgetPasswordForm from './ForgetPasswordForm'
import CenterCardLayout from '../../components/layout/CenterCardLayout'
import { useTranslation } from 'react-i18next'

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
