import React, { useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Avatar, TouchableRipple, IconButton } from 'react-native-paper'
import { H1, H3 } from 'native-base'
import { getUserAbbr } from 'src/utils/user'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import Loader from '../../components/loader/Loader'
import LinearGradient from 'react-native-linear-gradient'
import { times } from 'src/utils'
import { getGradientColors } from '../../../utils/colors'

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 4,
    padding: 16,
    marginRight: 32,
    width: 200,
    height: 200,
    alignItems: 'center',
    marginTop: 16,
  },
  returnBox: {
    paddingTop: 48,
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingTop: 32,
  },
  subtitle: {
    color: '#fff',
    marginTop: 4,
    fontFamily: 'Roboto',
  },
})
const ContactsList = ({
  myAuxiliariesRequest,
  auxiliaries,
  loading,
  helpedUser,
}) => {
  useEffect(() => {
    myAuxiliariesRequest()
  }, [])
  if (loading) {
    return <Loader loading />
  }

  const time = times(moment(), helpedUser)
  const gradientColors = getGradientColors(time)
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      colors={gradientColors}
      style={{ flex: 1 }}
    >
      <View style={{ marginLeft: 64 }}>
        <H1 style={styles.title}>Mes contacts</H1>
        <H3 style={styles.subtitle}>
          Appuyer sur la carte pour appeler la personne
        </H3>
      </View>
      <View
        style={{
          padding: 64,
          paddingTop: 24,
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          flexWrap: 'wrap',
        }}
      >
        <TouchableRipple
          onPress={() => {
            Actions.accueil()
          }}
        >
          <View style={StyleSheet.compose(styles.box, styles.returnBox)}>
            <Icon name="keyboard-return" size={40} color={'white'} />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 24,
              }}
            >
              Revenir
            </Text>
          </View>
        </TouchableRipple>
        {auxiliaries.map(auxiliary => (
          <TouchableRipple
            onPress={() => {
              Actions.push('videoCall', { auxiliary })
            }}
          >
            <View
              key={auxiliary.id}
              style={StyleSheet.compose(styles.box, {
                backgroundColor: gradientColors[1],
                paddingTop: 0,
              })}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Avatar.Text
                  size={64}
                  label={getUserAbbr(auxiliary)}
                  style={{
                    backgroundColor: '#15E6CD',
                  }}
                  color="white"
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                }}
              >
                {auxiliary.firstname} {auxiliary.lastname}
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </LinearGradient>
  )
}

export default ContactsList
