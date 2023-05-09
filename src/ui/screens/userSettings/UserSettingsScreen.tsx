import AppStyles from 'config/styles'
import { Translations } from 'core/i18n'
import type { HelpedUser} from 'core/types';
import { TrackedActivity } from 'core/types'
import moment from 'moment'
import { Heading } from 'native-base'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  TouchableWithoutFeedbackProps,
  ViewStyle} from 'react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import type { CheckboxProps } from 'react-native-paper'
import { IconButton,TouchableRipple } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { AuthActions } from 'store/auth'
import BacktoRootTimer from 'ui/components/BackToRootTimer'
import Checkbox from 'ui/components/common/Checkbox'
import GradientBackground from 'ui/components/GradientBackground'
import useActivityLog from 'ui/hooks/use-activity-log'
import { times } from 'utils'
import colorUtils from 'utils/colors'

const styles = StyleSheet.create({
  title: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  helpText: {
    opacity: 0.8,
    marginTop: 4,
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  checkboxRow: {
    marginTop: 24,
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

  interface CheckboxRowProps {
    status: CheckboxProps['status']
    onPress: TouchableWithoutFeedbackProps['onPress']
    title: string
    description: string
    style?: ViewStyle
    showCheckbox?: boolean
  }

  const CheckboxRow = ({
    description,
    onPress: oP,
    status,
    style,
    title,
    showCheckbox = true,
  }: CheckboxRowProps) => {
    return (
      <View style={{ flexDirection: 'row', ...style }}>
        <View style={{ opacity: showCheckbox ? 1 : 0 }}>
          <Checkbox
            color={textColor}
            status={status}
            onPress={oP}
            uncheckedColor={textColor}
            style={{ marginRight: 8 }}
          />
        </View>
        <TouchableRipple onPress={oP}>
          <>
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            <Text style={[styles.helpText, { color: textColor }]}>
              {description}
            </Text>
          </>
        </TouchableRipple>
      </View>
    )
  }

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
                size={26}
                color={textColor}
                icon={'arrow-back'}
                onPress={() => {
                  Actions.pop()
                }}
              >
                {Translations.common.go_back}
              </IconButton>
              <Heading size={'xl'} style={[styles.title, { color: textColor }]}>
                {Translations.common.settings}
              </Heading>
            </View>
          </View>
          <View>
            <>
              <CheckboxRow
                status={checked ? 'checked' : 'unchecked'}
                onPress={onPress}
                title={t(
                  'sceen.settings.automatic_pickup',
                  'Décrochage automatique'
                )}
                description={t(
                  'sceen.settings.automatic_pickup_description',
                  "L'appel entrant sera décroché automatiquement après 3 secondes."
                )}
              />
              <CheckboxRow
                status={minVolumeChecked ? 'checked' : 'unchecked'}
                onPress={onMinVolumePress}
                title={t('sceen.settings.min_volume', 'Volume activé')}
                description={t(
                  'sceen.settings.min_volume_description',
                  'Le volume sera toujours activé et ne descend pas au dessous de 50%'
                )}
                style={styles.checkboxRow}
              />
              <CheckboxRow
                status={dischargingAlertChecked ? 'checked' : 'unchecked'}
                onPress={onAlertOnDischargePress}
                title={t(
                  'sceen.settings.discharge_alert',
                  'Alerte débranchement'
                )}
                description={t(
                  'sceen.settings.discharge_alert_description',
                  "Lorsque la tablette est débranché, l'aidé sera alerté pour rebrancher sa tablette"
                )}
                style={styles.checkboxRow}
              />
            </>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                marginTop: 32,
              }}
            >
              <TouchableRipple
                mode={'outlined'}
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
                    name={'logout'}
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
