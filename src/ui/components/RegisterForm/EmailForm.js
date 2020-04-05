import React, { useState } from "react"
import { Form, Input, View, H3, Item, Button, Text, Icon } from "native-base"
import { Actions } from "react-native-router-flux"
const EmailForm = ({ setRegisterUser }) => {
  const [email, setEmail] = useState("")
  const [errorText, setErrorText] = useState(undefined)
  return (
    <View style={{ width: "100%" }}>
      <H3 style={{ marginBottom: 32, color: "#848484" }}>
        {errorText ? errorText : "Renseigner votre email"}
      </H3>
      <Form>
        <Item
          regular
          style={{
            borderRadius: 10,
            backgroundColor: "#EBEBEB",
            marginBottom: 16,
          }}
          error={!!errorText}
        >
          <Input
            autoCapitalize="none"
            placeholder={"Email"}
            autoFocus
            onChangeText={setEmail}
            value={email}
          />
          {errorText && <Icon name="close-circle" />}
        </Item>
        <Button
          full
          block
          onPress={() => {
            let hasError = false
            if (!email) {
              setErrorText("Veuillez renseigner un adresse mail")
              hasError = true
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
              hasError = true
              setErrorText("Veuillez renseigner un adresse mail valide")
            }
            if (hasError) {
              return
            }
            setErrorText(undefined)
            setRegisterUser({
              email,
            })
            Actions.register({
              step: "phone",
            })
          }}
          style={{ borderRadius: 10 }}
        >
          <Text>Continuer</Text>
        </Button>
      </Form>
    </View>
  )
}

export default EmailForm
