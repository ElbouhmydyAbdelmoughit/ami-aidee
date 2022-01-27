import React, { useEffect } from 'react'
import moment from 'core/moment'
import { Subheading } from 'react-native-paper'
import { Actions } from '@ami-app/react-native-router-flux'
import { Button, Text } from 'native-base'
import PasswordForm from './PasswordForm'
import CenterCardLayout from '../../components/layout/CenterCardLayout'
import { Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'

const ResetPasswordScreen = ({
  resetPaswordRequestRequest,
  data,
  loading,
  resetRequest,
}) => {
  useEffect(() => {
    if (data) {
      resetPaswordRequestRequest(data)
    }
  }, [])
  const { t } = useTranslation()
  let errorText
  if (!data) {
    errorText = Translations.common.unknown_error
  } else if (
    !resetRequest ||
    resetRequest.status === 'used' ||
    moment().diff(moment(resetRequest.created_at), 'days') > 2
  ) {
    errorText = t(
      'screen.reset_password.invalid_request',
      'Demande de réinitialisation de mot de passe invalide (utilisé ou expiré). Veuillez formuler une autre demande.'
    )
  }
  if (loading) {
    return (
      <CenterCardLayout>
        <Subheading style={{ marginBottom: 64 }}>
          {Translations.common.loading}
        </Subheading>
      </CenterCardLayout>
    )
  }
  if (errorText) {
    return (
      <CenterCardLayout>
        <Subheading style={{ marginTop: 64, marginBottom: 64 }}>
          {errorText}
        </Subheading>
        <Button block onPress={() => Actions.login()}>
          <Text>{Translations.common.back_to_home}}</Text>
        </Button>
      </CenterCardLayout>
    )
  }

  return (
    <CenterCardLayout>
      <Subheading>
        {t(
          'screen.reset_password.title',
          'Veuillez renseigner votre nouveau mot de passe'
        )}
      </Subheading>
      <PasswordForm resetCode={data} resetRequest={resetRequest} />
    </CenterCardLayout>
  )
}

export default ResetPasswordScreen
