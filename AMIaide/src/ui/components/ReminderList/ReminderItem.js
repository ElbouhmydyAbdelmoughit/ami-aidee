import React from 'react';
import { Image } from 'react-native';
import { List } from 'react-native-paper';

const ReminderItem = ({ title, desc, onPress, image }) => {

  console.log(`${title} | ${desc}`)
  return (
    <List.Item
      title={title}
      description={desc}
      onPress={onPress}
      left={props => <Image
        style={{ width: 150, height: '100%', paddingStart: -5 }}
        source={{ uri: image }}
      />}
    />
  );
};

export default ReminderItem;
