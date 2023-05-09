import React from 'react'
import { Text,View } from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'

import { getUserAbbr,getUserDisplayName } from '../../../utils/user'
import useActivityLog from '../../hooks/use-activity-log'

const MessagingNavBar = ({ user, textColor }) => {
  const logActivity = useActivityLog()
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
        color={textColor}
        icon="arrow-back"
        onPress={() => {
          logActivity('return_from_messaging')
          Actions.pop()
        }}
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
            color: textColor,
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
