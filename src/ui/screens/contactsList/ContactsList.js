import React, { useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Avatar, TouchableRipple, Button, IconButton } from 'react-native-paper'
import { H1, H3 } from 'native-base'
import { getUserAbbr } from 'src/utils/user'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from '@ami-app/react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { times } from 'src/utils'
import Loader from '../../components/loader/Loader'
import { getGradientColors } from '../../../utils/colors'
import useActivityLog from '../../hooks/use-activity-log'

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
  hasNewMessages,
}) => {
  useEffect(() => {
    myAuxiliariesRequest()
  }, [])
  if (loading) {
    return <Loader loading />
  }
  const logActivity = useActivityLog()
  const time = times(moment(), helpedUser)
  const gradientColors = getGradientColors(time)
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      colors={gradientColors}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 64, flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 32,
              }}
            >
              <IconButton
                size={32}
                color="white"
                icon="arrow-back"
                onPress={() => {
                  logActivity('return_from_messaging')
                  Actions.pop()
                }}
                style={{ marginBottom: 16 }}
              >
                Retour
              </IconButton>
              <H1 style={styles.title}>Mes contacts</H1>
            </View>
            <H3 style={styles.subtitle}>
              Appuyer sur la carte pour contacter la personne
            </H3>
          </View>
          <View style={{ marginTop: 32, marginRight: 32 }}>
            <Button
              mode="outlined"
              style={{ borderColor: 'white' }}
              onPress={() => {
                logActivity('select_user_settings')
                Actions.userSettings()
              }}
            >
              <Text
                style={{
                  color: 'white',
                  textTransform: 'uppercase',
                  fontSize: 18,
                }}
              >
                Paramètres
              </Text>
            </Button>
          </View>
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
          {auxiliaries.map((auxiliary, index) => (
            <TouchableRipple
              key={auxiliary.id}
              onPress={() => {
                logActivity('select_auxiliary_messaging')
                Actions.push('messaging', { auxiliary })
              }}
            >
              <View
                key={auxiliary.id}
                style={StyleSheet.compose(styles.box, {
                  backgroundColor: gradientColors[1],
                  paddingTop: 0,
                })}
              >
                {hasNewMessages[index] ? (
                  <View
                    style={{
                      marginTop: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        borderColor: 'white',
                        backgroundColor: 'white',
                        borderRadius: 4,
                        borderWidth: 1,
                        paddingTop: 2,
                        paddingRight: 8,
                        paddingLeft: 8,
                        paddingBottom: 2,
                      }}
                    >
                      <Text style={{ color: 'rgba(224, 41, 41, 0.9)' }}>
                        NOUVEAU MESSAGE
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{ height: 32 }} />
                )}
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
      </ScrollView>
    </LinearGradient>
  )
}

export default ContactsList
