import React, { useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Avatar, TouchableRipple, Button, IconButton } from 'react-native-paper'
import { Heading } from 'native-base'
import { getUserAbbr } from 'src/utils/user'
import moment from 'core/moment'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { times } from 'src/utils'
import Loader from '../../components/loader/Loader'
import colorUtils, { getGradientColors } from '../../../utils/colors'
import useActivityLog from '../../hooks/use-activity-log'
import { Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'
import BacktoRootTimer from 'ui/components/BackToRootTimer'

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
    fontSize: 24,
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
                  size={32}
                  color={textColor}
                  icon="arrow-back"
                  onPress={() => {
                    logActivity('return_from_messaging')
                    Actions.pop()
                  }}
                  style={{ marginBottom: 16 }}
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
