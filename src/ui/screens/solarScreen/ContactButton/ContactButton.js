import React from 'react'
import { View, Text } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

import { Actions } from '@ami-app/react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useActivityLog from '../../../hooks/use-activity-log'

const ContactButton = ({ hasNewMessage }) => {
  const primaryColor = hasNewMessage
    ? 'rgba(224, 41, 41, 0.9)'
    : 'rgb(255, 255, 255)'
  const logActivity = useActivityLog()
  return (
    <TouchableRipple
      onPress={() => {
        logActivity('navigate_to_contacts_list')
        Actions.push('contactsList')
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 4,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 8,
          padding: 20,
          paddingTop: 8,
          minWidth: 200,
          minHeight: 170,
        }}
      >
        {hasNewMessage ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                borderColor: 'white',
                borderRadius: 4,
                borderWidth: 1,
                paddingTop: 2,
                paddingRight: 8,
                paddingLeft: 8,
                paddingBottom: 2,
              }}
            >
              <Text style={{ color: primaryColor }}>NOUVEAU MESSAGE</Text>
            </View>
          </View>
        ) : null}
        <Icon name="account-heart" size={64} color={primaryColor} />
        <Text
          style={{
            color: primaryColor,
            fontWeight: 'bold',
            fontSize: 24,
          }}
        >
          Coucou
        </Text>
      </View>
    </TouchableRipple>
  )
}

export default ContactButton
