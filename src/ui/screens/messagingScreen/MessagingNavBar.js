import React from 'react'

import { View, Text } from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import { getUserDisplayName, getUserAbbr } from '../../../utils/user'

const MessagingNavBar = ({ user }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      <IconButton
        size={24}
        style={{ marginLeft: 16 }}
        color="white"
        icon="arrow-back"
        onPress={() => Actions.pop()}
      >
        Retour
      </IconButton>
      <Avatar.Text
        size={40}
        label={getUserAbbr(user)}
        style={{
          backgroundColor: '#15E6CD',
        }}
        color="white"
      />
      <View
        style={{
          flex: 1,
          marginLeft: 8,
        }}
      >
        <Text
          style={{
            marginLeft: 16,
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {getUserDisplayName(user)}
        </Text>
      </View>
    </View>
  )
}

export default MessagingNavBar
