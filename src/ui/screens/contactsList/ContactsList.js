import { Translations } from 'core/i18n'
import moment from 'core/moment'
import { Heading } from 'native-base'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar, Button, IconButton, TouchableRipple } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import { times } from 'src/utils'
import { getUserAbbr } from 'src/utils/user'
import BacktoRootTimer from 'ui/components/BackToRootTimer'

import colorUtils, { getGradientColors } from '../../../utils/colors'
import Loader from '../../components/loader/Loader'
import useActivityLog from '../../hooks/use-activity-log'

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  subtitle: {
    marginTop: 4,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  returnBox: {
    paddingTop: 48,
  },
  box: {
    width: 200,
    padding: 16,
    marginTop: 16,
    marginRight: 32,
    height: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
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
  const { t } = useTranslation()
  const logActivity = useActivityLog()

  if (loading) {
    return <Loader loading />
  }
  const time = times(moment(), helpedUser)
  const textColor = colorUtils.getTextColor(time)
  const gradientColors = getGradientColors(time)
  console.log(auxiliaries)
  return (
    <BacktoRootTimer>
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
                  size={26}
                  iconColor={textColor}
                  icon="arrow-left"
                  onPress={() => {
                    logActivity('return_from_messaging')
                    Actions.pop()
                  }}
                >
                  {Translations.common.go_back}
                </IconButton>
                <Heading size="xl" style={[styles.title, { color: textColor }]}>
                  {t('screen.contacts.title', 'Mes contacts')}
                </Heading>
              </View>
              <Heading style={[styles.subtitle, { color: textColor }]}>
                {t(
                  'screen.contacts.subtitle',
                  'Appuyer sur la carte pour contacter la personne'
                )}
              </Heading>
            </View>
            <View style={{ marginTop: 32, marginRight: 32 }}>
              <Button
                mode="outlined"
                style={{ borderColor: textColor }}
                onPress={() => {
                  logActivity('select_user_settings')
                  Actions.userSettings()
                }}
              >
                <Text
                  style={{
                    color: textColor,
                    textTransform: 'uppercase',
                    fontSize: 18,
                  }}
                >
                  {Translations.common.settings}
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
                    borderColor: textColor,
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
                          borderColor: textColor,
                          backgroundColor: 'white',
                          borderRadius: 4,
                          borderWidth: 1,
                          paddingTop: 2,
                          paddingRight: 8,
                          paddingLeft: 8,
                          paddingBottom: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: 'rgba(224, 41, 41, 0.9)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {Translations.common.new_message}
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
                      color: textColor,
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
    </BacktoRootTimer>
  )
}

export default ContactsList
