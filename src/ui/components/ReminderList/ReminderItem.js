import React from 'react'
import { Image } from 'react-native'
import { List } from 'react-native-paper'
import useActivityLog from '../../hooks/use-activity-log'

const ReminderItem = ({ title, desc, onPress, image }) => {
  const logActivity = useActivityLog()
  return (
    <List.Item
      title={title}
      description={desc}
      onPress={(...args) => {
        logActivity('select_reminder_item')
        onPress(...args)
      }}
      left={props => (
        <Image
          style={{ width: 150, height: '100%', paddingStart: -5 }}
          source={{ uri: image }}
        />
      )}
    />
  )
}

export default ReminderItem
