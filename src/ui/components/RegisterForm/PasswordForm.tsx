import { Translations } from 'core/i18n'
import { Button,Heading, View } from 'native-base'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-paper'

import useActivityLog from '../../hooks/use-activity-log'

const PasswordForm = ({ setRegisterUser, requestRegistration }) => {
  const [password, setPassword] = useState('')
  const logActivity = useActivityLog()

  const [errorText, setErrorText] = useState(undefined)
  const { t } = useTranslation()
  return (
    <View style={{ width: '100%' }}>
      <Heading size={'xl'} style={{ marginBottom: 32, color: '#848484' }}>
        {errorText ||
          t(
            'screen.register.password_title',
            'Enfin, choisir un mot de passe sécurisé'
          )}
      </Heading>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: '#EBEBEB',
          marginBottom: 16,
        }}
      >
        <TextInput
          secureTextEntry
          placeholder={Translations.common.password}
          onChangeText={setPassword}
          value={password}
          autoFocus
        />
      </View>
      <Button
        full
        block
        onPress={() => {
          logActivity('press_register_password_step')
          let hasError = false
          if (!password) {
            setErrorText(
              t(
                'screen.register.missing_password_error',
                'Veuillez renseigner un mot de passe'
              )
            )
            hasError = true
          } else if (password.length < 6) {
            hasError = true
            setErrorText(
              t(
                'screen.register.password_too_short_error',
                'Veuillez renseigner un mot de passe plus long'
              )
            )
          }
          if (hasError) {
            return
          }
          setErrorText(undefined)
          setRegisterUser({
            password,
          })
          requestRegistration()
        }}
        style={{ borderRadius: 10 }}
      >
        {Translations.common.to_continue}
      </Button>
    </View>
  )
}

export default PasswordForm
