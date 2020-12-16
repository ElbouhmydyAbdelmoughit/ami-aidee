import React, { useState, useEffect } from 'react'
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  Title,
  Icon,
  H3,
} from 'native-base'

import { BR } from 'src/ui/components'
import { Actions } from 'react-native-router-flux'
import useActivityLog from '../../hooks/use-activity-log'
import { View, TouchableHighlight } from 'react-native'

export default ({ style, form, onValidate }) => {
  const [username, setUsername] = useState((form && form.username) || '')
  const [password, setPassword] = useState((form && form.password) || '')
  const logActivity = useActivityLog()

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
    <Form style={style}>
      <Item regular style={{ borderRadius: 10, backgroundColor: '#EBEBEB' }}>
        <Icon active name="mail" style={{ color: '#6E6D6D' }} />
        <Input
          autoCapitalize="none"
          placeholder={'Email'}
          onChangeText={setUsername}
          value={username}
        />
      </Item>

      <Item
        regular
        style={{ borderRadius: 10, marginTop: 16, backgroundColor: '#EBEBEB' }}
      >
        <Icon active name="lock" style={{ color: '#6E6D6D' }} />
        <Input
          secureTextEntry
          onChangeText={setPassword}
          placeholder={'Password'}
          value={password}
        />
      </Item>
      <Button
        block
        disabled={!isFormValid()}
        onPress={validate}
        style={{ borderRadius: 10, marginTop: 16 }}
      >
        <Text>Se connecter</Text>
      </Button>
      <View style={{ marginTop: 8 }}>
        <TouchableHighlight onPress={() => Actions.passwordResetRequest()}>
          <View>
            <Text
              style={{
                color: '#848484',
              }}
            >
              Mot de passe oublié ?
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <BR />
      <H3
        style={{
          textAlign: 'center',
          color: '#848484',
        }}
      >
        Vous n'avez pas encore de compte ?
      </H3>
      <Button
        full
        bordered
        onPress={() => {
          logActivity('press_register_btn')
          Actions.register({ step: 'name' })
        }}
        style={{ borderRadius: 10 }}
      >
        <Text style={{}}>S'inscrire</Text>
      </Button>
      <BR />
    </Form>
  )
}
