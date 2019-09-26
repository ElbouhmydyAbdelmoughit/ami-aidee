import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Container, Content, Text, H1 } from 'native-base';
import material from 'AMIaide/native-base-theme/variables/material';
import LinearGradient from 'react-native-linear-gradient';

const color = ['#3FEDFF', '#8772FF']
const SplashScreen = ({ auth }) => {

  console.log(auth)
  const handleStart = () => {
    if (auth && auth.jwt) Actions.root()
    else Actions.login()
  };

  setTimeout(function () { handleStart() }, 2000);
  return (
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
        colors={color}
        style={{ flex: 1 }}>
      <View style={{
        flex: 1, justifyContent: 'center',
        backgroundColor: 'transparent'
      }}>
        <H1 style={styles.title}>{"A.M.I"}</H1>
        </View>
      </LinearGradient>
    </Container>
  )
}

const styles = {

  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 80,
    paddingTop: 80,
    textAlign:'center',
    height: 120
  }
}

export default SplashScreen
