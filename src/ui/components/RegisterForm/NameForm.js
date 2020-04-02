import React, { useState } from "react"
import { Form, Input, View, H2, Item, Button, Text, Icon } from "native-base"
import { Actions } from "react-native-router-flux"
const NameForm = ({ setRegisterUser }) => {
  const [firstname, setFirstname] = useState("An")
  const [firstnameError, setFirstnameError] = useState(false)
  const [lastname, setLastname] = useState("Dang")
  const [lastnameError, setLastnameError] = useState(false)
  const [errorText, setErrorText] = useState(undefined)
  return (
    <View style={{ width: "100%" }}>
      <H2 style={{ marginTop: 16, marginBottom: 64, color: "#848484" }}>
        {errorText ? errorText : "Renseigner votre nom et prénom"}
      </H2>
      <Form>
        <View
          style={{
            borderRadius: 10,
            flexDirection: "row",
            width: "100%",
            marginBottom: 16,
          }}
        >
          <Item
            regular
            error={firstnameError}
            style={{ borderRadius: 10, flex: 1, backgroundColor: "#EBEBEB" }}
          >
            <Input
              placeholder={"Prénom"}
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
              backgroundColor: "#EBEBEB",
            }}
          >
            <Input
              placeholder={"Nom"}
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
            let hasError = false
            if (!firstname) {
              setErrorText("Veuillez renseigner votre prénom")
              setFirstnameError(true)
              hasError = true
            }
            if (!lastname) {
              setErrorText("Veuillez renseigner votre nom")
              setLastnameError(true)
              hasError = true
            }
            if (!firstname && !lastname) {
              setErrorText("Veuillez renseigner votre nom et prénom")
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
              step: "email",
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

export default NameForm
