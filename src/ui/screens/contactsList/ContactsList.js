import React, { useEffect } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Avatar } from 'react-native-paper'
import { getUserAbbr } from 'src/utils/user'
import { Actions } from 'react-native-router-flux'
import Loader from '../../components/loader/Loader'

const ContactsList = ({ myAuxiliariesRequest, auxiliaries, loading }) => {
  useEffect(() => {
    myAuxiliariesRequest()
  }, [])
  if (loading) {
    return <Loader loading />
  }
  return (
    <View>
      {auxiliaries.map(auxiliary => (
        <TouchableHighlight
          onPress={() => {
            Actions.videoCall()
          }}
        >
          <View key={auxiliary.id}>
            <Avatar.Text size={46} label={getUserAbbr(auxiliary)} />
            <Text>
              {auxiliary.firstname} {auxiliary.lastname}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  )
}

export default ContactsList
