import React, { useState } from 'react'
import { Form, Input, View, H3, Item, Button, Text, Icon } from 'native-base'
import { Actions } from '@ami-app/react-native-router-flux'
import useActivityLog from '../../hooks/use-activity-log'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'

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
      <H3 style={{ marginBottom: 32, color: '#848484' }}>
        {errorText
          ? errorText
          : t('screen.register.name_title', 'Renseigner votre nom et prénom')}
      </H3>
      <Form>
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            width: '100%',
            marginBottom: 16,
          }}
        >
          <Item
            regular
            error={firstnameError}
            style={{ borderRadius: 10, flex: 1, backgroundColor: '#EBEBEB' }}
          >
            <Input
              placeholder={Translations.common.firstname}
              onChangeText={setFirstname}
              value={firstname}
              autoFocus
            />
            {firstnameError && <Icon name="close-circle" />}
          </Item>
          <Item
            regular
            error={lastnameError}
            style={{
              borderRadius: 10,
              flex: 1,
              marginLeft: 8,
              backgroundColor: '#EBEBEB',
            }}
          >
            <Input
              placeholder={Translations.common.lastname}
              onChangeText={setLastname}
              value={lastname}
            />
            {lastnameError && <Icon name="close-circle" />}
          </Item>
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
          <Text>{Translations.common.to_continue}</Text>
        </Button>
      </Form>
    </View>
  )
}

export default NameForm
