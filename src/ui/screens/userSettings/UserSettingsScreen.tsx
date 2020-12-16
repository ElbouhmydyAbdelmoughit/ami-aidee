import React, { useState } from 'react'
import GradientBackground from 'ui/components/GradientBackground'
import { Actions } from 'react-native-router-flux'
import { Checkbox, Button, TouchableRipple } from 'react-native-paper'
import { H1 } from 'native-base'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useActivityLog from 'ui/hooks/use-activity-log'
import { HelpedUser, TrackedActivity } from 'core/types'
import { useDispatch } from 'react-redux'
import { AuthActions } from 'store/auth'
import AppStyles from 'config/styles'

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingTop: 32,
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
  const logActivity = useActivityLog()
  const dispatch = useDispatch()
  const onPress = () => {
    logActivity(TrackedActivity.TOGGLE_AUTOMATIC_PICKUP_CHECKBOX)
    userModifyRequest({
      id: currentHelpedUser.id,
      automatic_pickup: !checked,
    })
    setChecked(c => !c)
  }
  return (
    <GradientBackground>
      <View
        style={{
          marginLeft: 64,
          alignItems: 'flex-start',
          height: '100%',
        }}
      >
        <View
          style={{
            marginTop: 32,
            marginBottom: 64,
          }}
        >
          <H1 style={styles.title}>Paramètres</H1>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableRipple
            mode="outlined"
            dark
            style={{
              borderColor: 'white',
              borderRadius: 4,
              borderWidth: 1,
              marginBottom: 24,
            }}
            onPress={() => {
              logActivity(TrackedActivity.RETURN_FROM_USER_SETTINGS)
              Actions.pop()
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
              <Icon name="keyboard-return" size={16} color={'white'} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  marginLeft: 8,
                }}
              >
                Revenir
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              color="white"
              status={checked ? 'checked' : 'unchecked'}
              onPress={onPress}
              uncheckedColor="white"
            />
            <TouchableRipple onPress={onPress}>
              <React.Fragment>
                <Text style={styles.text}>Décrochage automatique</Text>
                <Text style={styles.helpText}>
                  L'appel entrant sera décroché automatiquement après 3
                  secondes.
                </Text>
              </React.Fragment>
            </TouchableRipple>
          </View>
        </View>
        <TouchableRipple
          mode="outlined"
          dark
          style={{
            borderColor: AppStyles.colors.danger,
            borderRadius: 4,
            borderWidth: 1,
            marginBottom: 80,
            alignSef: 'flex-end',
          }}
          onPress={() => {
            dispatch(AuthActions.logout())
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
            <Icon name="logout" size={16} color={AppStyles.colors.danger} />
            <Text
              style={{
                color: AppStyles.colors.danger,
                fontSize: 18,
                textTransform: 'uppercase',
                fontWeight: '700',
                marginLeft: 8,
              }}
            >
              Déconnexion
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </GradientBackground>
  )
}

export default UserSettingsScreen
