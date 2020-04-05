import React, { useState } from "react"
import { Form, Input, View, H3, Item, Button, Text, Icon } from "native-base"
import { Actions } from "react-native-router-flux"

const PhoneForm = ({ setRegisterUser }) => {
  const [phone, setPhone] = useState("")
  const [errorText, setErrorText] = useState(undefined)
  return (
    <View style={{ width: "100%" }}>
      <H3 style={{ marginBottom: 32, color: "#848484" }}>
        {errorText ? errorText : "Renseigner votre numéro de téléphone"}
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
            placeholder={"Numéro de téléphone"}
            onChangeText={setPhone}
            value={phone}
            autoFocus
          />
          {errorText && <Icon name="close-circle" />}
        </Item>
        <Button
          full
          block
          onPress={() => {
            let hasError = false
            if (!phone) {
              setErrorText("Veuillez renseigner un numéro de téléphone")
              hasError = true
            } else if (!/\+?[0-9]+/.test(phone)) {
              hasError = true
              setErrorText("Veuillez renseigner un numéro de téléphone valide")
            }
            if (hasError) {
              return
            }
            setErrorText(undefined)
            setRegisterUser({
              phone,
            })
            Actions.register({
              step: "password",
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

export default PhoneForm
