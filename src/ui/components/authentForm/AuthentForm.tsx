import React, { useState } from 'react'
import { Button, Text, Heading } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BR } from 'ui/components'
import { Actions } from 'react-native-router-flux'
import useActivityLog from '../../hooks/use-activity-log'
import { View, TouchableOpacity } from 'react-native'
import { Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-paper'

export default ({ style, form, onValidate }) => {
  const [username, setUsername] = useState((form && form.username) || '')
  const [password, setPassword] = useState((form && form.password) || '')
  const logActivity = useActivityLog()
  const { t } = useTranslation()
  //const []

  /**
   * matches a string of six or more characters;
   * that contains at least one digit (\d is shorthand for [0-9]);
   * at least one lowercase character; and at least one uppercase character
   * @param {*} str the password
   */
  const checkPassword = str => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    return re.test(str)
  }

  const isFormValid = () => {
    return !(username == '' || password == '')
  }

  const validate = () => {
    logActivity('press_login_btn')
    if (isFormValid()) {
      onValidate({
        username: username,
        password: password,
      })
    }
  }

  return (
    <View style={style}>
      <View style={{ borderRadius: 10, backgroundColor: '#EBEBEB' }}>
        <TextInput
          autoCapitalize="none"
          placeholder={Translations.common.email}
          onChangeText={setUsername}
          style={{ paddingLeft: 27 }}
          value={username}
        />
        <Icon
          acive
          name="mail"
          style={{ color: '#6E6D6D', position: 'absolute', left: 10, top: 18 }}
          size={20}
        />
      </View>

      <View
        style={{ borderRadius: 10, marginTop: 16, backgroundColor: '#EBEBEB' }}
      >
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder={Translations.common.password}
          value={password}
          style={{ paddingLeft: 27 }}
        />
        <Icon
          active
          name="lock"
          size={20}
          style={{ color: '#6E6D6D', position: 'absolute', left: 10, top: 18 }}
        />
      </View>
      <Button
        block
        disabled={!isFormValid()}
        onPress={validate}
        style={{ borderRadius: 10, marginTop: 16 }}
      >
        {Translations.common.to_login}
      </Button>
      <View style={{ marginTop: 8 }}>
        <TouchableOpacity onPress={() => Actions.passwordResetRequest()}>
          <View>
            <Text
              style={{
                color: '#848484',
              }}
            >
              {Translations.common.forgot_password}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BR />
      <Heading
        style={{
          textAlign: 'center',
          color: '#848484',
        }}
      >
        {t('screen.login.no_account', "Vous n'avez pas encore de compte ?")}
      </Heading>
      <Button
        full
        variant="outline"
        onPress={() => {
          logActivity('press_register_btn')
          Actions.register({ step: 'name' })
        }}
        style={{ borderRadius: 10 }}
      >
        {Translations.common.to_signup}
      </Button>
      <BR />
    </View>
  )
}
