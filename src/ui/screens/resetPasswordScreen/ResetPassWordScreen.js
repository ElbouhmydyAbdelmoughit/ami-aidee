import React, { useEffect } from 'react'
import moment from 'moment'
import { Subheading } from 'react-native-paper'
import { Actions } from '@ami-app/react-native-router-flux'
import { Button, Text } from 'native-base'
import PasswordForm from './PasswordForm'
import CenterCardLayout from '../../components/layout/CenterCardLayout'

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

  let errorText
  if (!data) {
    errorText = 'Erreur inconnue'
  } else if (
    !resetRequest ||
    resetRequest.status === 'used' ||
    moment().diff(moment(resetRequest.created_at), 'days') > 2
  ) {
    errorText =
      'Demande de réinitialisation de mot de passe invalide (utilisé ou expiré). Veuillez formuler une autre demande.'
  }
  if (loading) {
    return (
      <CenterCardLayout>
        <Subheading style={{ marginBottom: 64 }}>Chargement...</Subheading>
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
          <Text>Retourner à l'accueil</Text>
        </Button>
      </CenterCardLayout>
    )
  }

  return (
    <CenterCardLayout>
      <Subheading>Veuillez renseigner votre nouveau mot de passe</Subheading>
      <PasswordForm resetCode={data} resetRequest={resetRequest} />
    </CenterCardLayout>
  )
}

export default ResetPasswordScreen
