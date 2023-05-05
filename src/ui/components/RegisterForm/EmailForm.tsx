import { Translations } from 'core/i18n'
import { Button, Heading,View } from 'native-base'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import useActivityLog from '../../hooks/use-activity-log'

const EmailForm = ({ setRegisterUser }) => {
  const [email, setEmail] = useState('')
  const [errorText, setErrorText] = useState(undefined)
  const logActivity = useActivityLog()
  const { t } = useTranslation()
  return (
    <View style={{ width: '100%' }}>
      <Heading style={{ marginBottom: 32, color: '#848484' }}>
        {errorText ||
          t('screen.register.email_title', 'Renseigner votre email')}
      </Heading>
      <View>
        <View
          regular
          style={{
            borderRadius: 10,
            backgroundColor: '#EBEBEB',
            marginBottom: 16,
          }}
          error={!!errorText}
        >
          <TextInput
            autoCapitalize={'none'}
            placeholder={'Email'}
            autoFocus
            onChangeText={setEmail}
            value={email}
          />
        </View>
        {errorText && <Icon name={'close-circle'} />}
        <Button
          full
          block
          onPress={() => {
            logActivity('press_register_email_step')
            let hasError = false
            if (!email) {
              setErrorText(
                t(
                  'screen.register.missing_email_error',
                  'Veuillez renseigner un adresse mail'
                )
              )
              hasError = true
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
              hasError = true
              setErrorText(
                t(
                  'screen.register.invalid_email_error',
                  'Veuillez renseigner un adresse mail valide'
                )
              )
            }
            if (hasError) {
              return
            }
            setErrorText(undefined)
            setRegisterUser({
              email,
            })
            Actions.register({
              step: 'phone',
            })
          }}
          style={{ borderRadius: 10 }}
        >
          {Translations.common.to_continue}
        </Button>
      </View>
    </View>
  )
}

export default EmailForm
