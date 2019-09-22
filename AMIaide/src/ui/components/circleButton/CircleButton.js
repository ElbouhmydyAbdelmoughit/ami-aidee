import React, { Component } from 'react';
import { Button, Image, TouchableHighlight, View } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';

const CircleButton = ({ source, onPress, size }) => {

  return (
    <TouchableHighlight  onPress={onPress} color={'#fff'} 
    underlayColor={'#DDD'}
    style={{ borderRadius: size / 2,
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: '#fff', width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{width: size / 2.5, height: size / 2.5}}
      resizeMode={"contain"}
          source={source} />                 
    </TouchableHighlight>
  );
}

export default CircleButton