import React, { useState } from "react"
import { Form, Input, View, H3, Item, Button, Text } from "native-base"
import { Actions } from "react-native-router-flux"

const PasswordForm = ({
  setRegisterUser,
  registerUser,
  requestRegistration,
}) => {
  const [password, setPassword] = useState("")

  const [errorText, setErrorText] = useState(undefined)
  return (
    <View style={{ width: "100%" }}>
      <H3 style={{ marginBottom: 32, color: "#848484" }}>
        {errorText ? errorText : "Enfin, choisir un mot de passe sécurisé"}
      </H3>
      <Form>
        <Item
          regular
          style={{
            borderRadius: 10,
            backgroundColor: "#EBEBEB",
            marginBottom: 16,
          }}
        >
          <Input
            secureTextEntry
            placeholder={"Mot de passe"}
            onChangeText={setPassword}
            value={password}
            autoFocus
          />
        </Item>
        <Button
          full
          block
          onPress={() => {
            let hasError = false
            if (!password) {
              setErrorText("Veuillez renseigner un mot de passe")
              hasError = true
            } else if (password.length < 6) {
              hasError = true
              setErrorText("Veuillez renseigner un mot de passe plus long")
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
          <Text>Continuer</Text>
        </Button>
      </Form>
    </View>
  )
}

export default PasswordForm
