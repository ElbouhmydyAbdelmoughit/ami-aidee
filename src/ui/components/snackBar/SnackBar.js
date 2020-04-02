import React, { useState } from "react"
import { Image } from "react-native"
import { Banner, Headline, TouchableRipple } from "react-native-paper"
import Icon from "react-native-vector-icons/EvilIcons"

export const SnackBar = ({ isShown, message, level, forceHide }) => {
  return (
    <TouchableRipple
      onPress={() => {
        forceHide()
      }}
      rippleColor="rgba(0, 0, 0, 0)"
    >
      <Banner
        visible={isShown}
        actions={[]}
        image={({ size }) => (
          <Icon
            name={level == -1 ? "close-o" : "check"}
            size={size}
            color={"#FFF"}
          />
        )}
        style={{ backgroundColor: level == -1 ? "#B22222" : "#228B22" }}
      >
        <Headline style={{ color: "#fff" }}>{message}</Headline>
      </Banner>
    </TouchableRipple>
  )
}
