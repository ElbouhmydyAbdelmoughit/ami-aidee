import { Translations } from 'core/i18n'
import { Button, Text } from 'native-base'
import React, { useState } from 'react'
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useActivityLog from '../../hooks/use-activity-log'
import { useIsHelpedUserQuery } from './hooks/useIsHelpedUserQuery';

interface IAuthentForm {
  style: ViewStyle
  form?: any
  onValidate: (values: any) => void
}

const AuthentForm = ({ style, form, onValidate }: IAuthentForm) => {
  const [username, setUsername] = useState((form && form.username) || '')
  const [password, setPassword] = useState((form && form.password) || '')
  const logActivity = useActivityLog()

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
    return !(username === '' || password === '')
  }

  const { data: isHelpedUser } = useIsHelpedUserQuery(username)

  const validate = () => {
    logActivity('press_login_btn')
    if (isFormValid()) {
      onValidate({
        username,
        password,
        invalid: !isHelpedUser
      })
    }
  }

  return (
    <View style={style}>
      <View style={styles.emailContainer}>
        <TextInput
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder={Translations.common.email}
          onChangeText={setUsername}
          style={styles.textInput}
          value={username}
        />
        <Icon name={'mail'} style={styles.icon} size={20} />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder={Translations.common.password}
          value={password}
          style={styles.textInput}
        />
        <Icon name={'lock'} size={20} style={styles.icon} />
      </View>
      <Button
        block
        disabled={!isFormValid()}
        onPress={validate}
        style={styles.loginButton}
      >
        {Translations.common.to_login}
      </Button>
      <TouchableOpacity
        style={styles.forgotPasswordTouchableOpacity}
        onPress={Actions.passwordResetRequest}
      >
        <Text style={styles.forgotPasswordText}>
          {Translations.common.forgot_password}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 27,
  },
  passwordContainer: {
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
  },
  loginButton: {
    marginTop: 16,
    borderRadius: 10,
  },
  icon: {
    top: 18,
    position: 'absolute',
    left: 10,
    color: '#6E6D6D',
  },
  forgotPasswordTouchableOpacity: {
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#848484',
  },
  emailContainer: {
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
  },
})

export default AuthentForm
