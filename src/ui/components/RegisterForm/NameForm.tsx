import { Translations } from 'core/i18n'
import { Button, Heading, Icon,View } from 'native-base'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'

import useActivityLog from '../../hooks/use-activity-log'

const NameForm = ({ setRegisterUser }) => {
  const [firstname, setFirstname] = useState('')
  const [firstnameError, setFirstnameError] = useState(false)
  const [lastname, setLastname] = useState('')
  const [lastnameError, setLastnameError] = useState(false)
  const [errorText, setErrorText] = useState(undefined)
  const logActivity = useActivityLog()
  const { t } = useTranslation()
  return (
    <View style={{ width: '100%' }}>
      <Heading style={{ marginBottom: 32, color: '#848484' }}>
        {errorText ||
          t('screen.register.name_title', 'Renseigner votre nom et prénom')}
      </Heading>
      <View>
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            width: '100%',
            marginBottom: 16,
          }}
        >
          <View
            regular
            error={firstnameError}
            style={{ borderRadius: 10, flex: 1, backgroundColor: '#EBEBEB' }}
          >
            <TextInput
              placeholder={Translations.common.firstname}
              onChangeText={setFirstname}
              value={firstname}
              autoFocus
            />
            {firstnameError && <Icon name={'close-circle'} />}
          </View>
          <View
            error={lastnameError}
            style={{
              borderRadius: 10,
              flex: 1,
              marginLeft: 8,
              backgroundColor: '#EBEBEB',
            }}
          >
            <TextInput
              placeholder={Translations.common.lastname}
              onChangeText={setLastname}
              value={lastname}
            />
            {lastnameError && <Icon name={'close-circle'} />}
          </View>
        </View>
        <Button
          full
          block
          onPress={() => {
            logActivity('press_register_name_step')
            let hasError = false
            if (!firstname) {
              setErrorText(
                t(
                  'screen.register.missing_firstname_error',
                  'Veuillez renseigner votre prénom'
                )
              )
              setFirstnameError(true)
              hasError = true
            }
            if (!lastname) {
              setErrorText(
                t(
                  'screen.register.missing_lastname_error',
                  'Veuillez renseigner votre nom'
                )
              )
              setLastnameError(true)
              hasError = true
            }
            if (!firstname && !lastname) {
              setErrorText(
                t(
                  'screen.register.missing_firstname_lastname_error',
                  'Veuillez renseigner votre nom et prénom'
                )
              )
            }
            if (hasError) {
              return
            }
            setFirstnameError(false)
            setLastnameError(false)
            setErrorText(undefined)
            setRegisterUser({
              firstname,
              lastname,
            })
            Actions.register({
              step: 'email',
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

export default NameForm
