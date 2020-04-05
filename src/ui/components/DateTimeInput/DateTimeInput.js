import React, { Component } from "react"
import { Text, View, Keyboard, TouchableHighlight } from "react-native"
import { Button, TextInput, Avatar, Subheading } from "react-native-paper"
import DatePicker from "react-native-datepicker"
import styles from "./styles"
import Icon from "react-native-vector-icons/MaterialIcons"

const DateTimeInput = (
  onChangeText,
  showIcon,
  mode,
  placeholder,
  value,
  PickerProps,
  label
) => {
  const state = {
    isDateTimePickerVisible: false,
    date: "",
  }

  return (
    <View>
      {label && (
        <Subheading
          style={{
            paddingTop: 15,
            color: "#AAA",
            marginLeft: showIcon ? 5 : 0,
            fontSize: 13,
          }}
        >
          {label}
        </Subheading>
      )}
      <View
        style={{
          height: label ? 20 : 40,
          justifyContent: "flex-end",
          flexDirection: "row",
          alignItems: "center",
          marginTop: label ? 0 : 22,
        }}
      >
        {showIcon == true && (
          <Icon
            name={mode == "time" ? "access-time" : "date-range"}
            size={30}
            color={"#BBB"}
          />
        )}
        <DatePicker
          style={PickerProps}
          date={value}
          mode={mode}
          placeholder={placeholder}
          format={mode == "time" ? "LT" : "YYYY-MM-DD"}
          confirmBtnText="Ok"
          cancelBtnText="Annuler"
          showIcon={false}
          customStyles={{
            dateInput: {
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: showIcon ? 5 : 0,
              marginTop: 5,
              marginBottom: 5,
              borderWidth: 0,
              borderBottomColor: "#BBB",
              borderBottomWidth: 0.5,
            },
          }}
          onDateChange={onChangeText}
        />
      </View>
    </View>
  )
}

export default DateTimeInput
