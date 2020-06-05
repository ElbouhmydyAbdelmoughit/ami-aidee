import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'

const getAbbr = user => {
  const firstLetterFirstname = user.firstname ? user.firstname[0] : ''
  const firstLetterLastname = user.lastname ? user.lastname[0] : ''
  return `${firstLetterFirstname}${firstLetterLastname}`
}
const UserAvatar = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar.Text
        size={80}
        label={getAbbr(user)}
        style={{
          backgroundColor: '#15E6CD',
        }}
        color="white"
      />
      <Text
        style={{
          marginTop: 16,
          fontSize: 24,
          color: 'rgba(255, 255, 255, 0.9 )',
        }}
      >
        {user.firstname} {user.lastname}
      </Text>
      <Text
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        {user.email}
      </Text>
    </View>
  )
}

export default UserAvatar
