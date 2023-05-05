import React from 'react'
import { Subheading } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import ForgetPasswordForm from './ForgetPasswordForm'
import CenterCardLayout from '../../components/layout/CenterCardLayout'

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
