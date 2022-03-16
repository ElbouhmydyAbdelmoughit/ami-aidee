import React, { useRef, useState } from 'react'
import GradientBackground from 'ui/components/GradientBackground'
import { Actions } from '@ami-app/react-native-router-flux'
import {
  Checkbox,
  Button,
  TouchableRipple,
  IconButton,
} from 'react-native-paper'
import { H1 } from 'native-base'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useActivityLog from 'ui/hooks/use-activity-log'
import { HelpedUser, TrackedActivity } from 'core/types'
import { useDispatch } from 'react-redux'
import { AuthActions } from 'store/auth'
import AppStyles from 'config/styles'
import { Translations } from 'core/i18n'
import { useTranslation } from 'react-i18next'
import { times } from 'utils'
import moment from 'moment'
import colorUtils from 'utils/colors'
import BacktoRootTimer from 'ui/components/BackToRootTimer'

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  helpText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 18,
    opacity: 0.8,
    fontFamily: 'Roboto',
  },
})

type Props = {
  currentHelpedUser: HelpedUser
  userModifyRequest: (user: Partial<HelpedUser>) => void
}
const UserSettingsScreen = ({
  currentHelpedUser,
  userModifyRequest,
}: Props) => {
  const [checked, setChecked] = useState(currentHelpedUser.automatic_pickup)
  const time = times(moment(), currentHelpedUser)
  const textColor = colorUtils.getTextColor(time)

  const [minVolumeChecked, setMinVolumeChecked] = useState(
    currentHelpedUser.min_volume === 0.5
  )
  const [dischargingAlertChecked, setDischargingAlertChecked] = useState(
    currentHelpedUser.alert_on_discharge
  )
  const timerRef = useRef()
  const resetBackToRootTimer = () => {
    timerRef.current?.reset()
  }

  const logActivity = useActivityLog()
  const dispatch = useDispatch()
  const onPress = () => {
    logActivity(TrackedActivity.TOGGLE_AUTOMATIC_PICKUP_CHECKBOX)
    userModifyRequest({
      id: currentHelpedUser.id,
      automatic_pickup: !checked,
    })
    setChecked(c => !c)
    resetBackToRootTimer()
  }
  const onMinVolumePress = () => {
    logActivity(TrackedActivity.TOGGLE_MIN_VOLUME_SET)
    userModifyRequest({
      id: currentHelpedUser.id,
      min_volume: minVolumeChecked ? 0 : 0.5,
    })
    setMinVolumeChecked(c => !c)
    resetBackToRootTimer()
  }
  const onAlertOnDischargePress = () => {
    logActivity(TrackedActivity.TOGGLE_ALERT_ON_DISCHARGE)
    userModifyRequest({
      id: currentHelpedUser.id,
      alert_on_discharge: !dischargingAlertChecked,
    })
    setDischargingAlertChecked(c => !c)
    resetBackToRootTimer()
  }
  const { t } = useTranslation()
  return (
    <BacktoRootTimer timerRef={timerRef}>
      <GradientBackground>
        <ScrollView
          contentContainerStyle={{
            marginLeft: 64,
          }}
        >
          <View
            style={{
              marginTop: 32,
              marginBottom: 64,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <IconButton
                size={32}
                color={textColor}
                icon="arrow-back"
                onPress={() => {
                  Actions.pop()
                }}
                style={{ marginBottom: 16 }}
              >
                {Translations.common.go_back}
              </IconButton>
              <H1 style={[styles.title, { color: textColor }]}>
                {Translations.common.settings}
              </H1>
            </View>
          </View>
          <View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Checkbox
                  color={textColor}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={onPress}
                  uncheckedColor={textColor}
                />
                <TouchableRipple onPress={onPress}>
                  <React.Fragment>
                    <Text style={[styles.text, { color: textColor }]}>
                      {t(
                        'sceen.settings.automatic_pickup',
                        'Décrochage automatique'
                      )}
                    </Text>
                    <Text style={[styles.helpText, { color: textColor }]}>
                      {t(
                        'sceen.settings.automatic_pickup_description',
                        "L'appel entrant sera décroché automatiquement après 3 secondes."
                      )}
                    </Text>
                  </React.Fragment>
                </TouchableRipple>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 24 }}>
                <Checkbox
                  color={textColor}
                  status={minVolumeChecked ? 'checked' : 'unchecked'}
                  onPress={onMinVolumePress}
                  uncheckedColor={textColor}
                />
                <TouchableRipple onPress={onMinVolumePress}>
                  <React.Fragment>
                    <Text style={[styles.text, { color: textColor }]}>
                      {t('sceen.settings.min_volume', 'Volume activé')}
                    </Text>
                    <Text style={[styles.helpText, { color: textColor }]}>
                      {t(
                        'sceen.settings.min_volume_description',
                        'Le volume sera toujours activé et ne descend pas au dessous de 50%'
                      )}
                    </Text>
                  </React.Fragment>
                </TouchableRipple>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 24 }}>
                <Checkbox
                  color={textColor}
                  status={dischargingAlertChecked ? 'checked' : 'unchecked'}
                  onPress={onAlertOnDischargePress}
                  uncheckedColor={textColor}
                />
                <TouchableRipple onPress={onAlertOnDischargePress}>
                  <React.Fragment>
                    <Text style={[styles.text, { color: textColor }]}>
                      {t(
                        'sceen.settings.discharge_alert',
                        'Alerte débranchement'
                      )}
                    </Text>
                    <Text style={[styles.helpText, { color: textColor }]}>
                      {t(
                        'sceen.settings.discharge_alert_description',
                        "Lorsque la tablette est débranché, l'aidé sera alerté pour rebrancher sa tablette"
                      )}
                    </Text>
                  </React.Fragment>
                </TouchableRipple>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                marginTop: 32,
              }}
            >
              <TouchableRipple
                mode="outlined"
                dark
                style={{
                  borderColor: AppStyles.colors.danger,
                  borderRadius: 4,
                  borderWidth: 1,

                  marginBottom: 80,
                }}
                onPress={() => {
                  dispatch(AuthActions.logout())
                  resetBackToRootTimer()
                }}
              >
                <View
                  style={{
                    alignItems: 'baseline',
                    flexDirection: 'row',
                    padding: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  <Icon
                    name="logout"
                    size={16}
                    color={AppStyles.colors.danger}
                  />
                  <Text
                    style={{
                      color: AppStyles.colors.danger,
                      fontSize: 18,
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      marginLeft: 8,
                    }}
                  >
                    {Translations.common.to_signout}
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
        </ScrollView>
      </GradientBackground>
    </BacktoRootTimer>
  )
}

export default UserSettingsScreen
