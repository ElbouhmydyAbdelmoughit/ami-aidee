import React, { useState } from 'react'
import GradientBackground from 'src/ui/components/GradientBackground'
import { Actions } from 'react-native-router-flux'
import { Checkbox, Button, TouchableRipple } from 'react-native-paper'
import { H1 } from 'native-base'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useActivityLog from '../../hooks/use-activity-log'

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

const UserSettingsScreen = ({ currentHelpedUser, userModifyRequest }) => {
  const [checked, setChecked] = useState(currentHelpedUser.automatic_pickup)
  const logActivity = useActivityLog()

  const onPress = () => {
    logActivity('toggle_automatic_pickup_checkbox')
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
        }}
      >
        <View
          style={{
            marginTop: 32,
            marginBottom: 64,
          }}
        >
          <H1 style={styles.title}>Options d'appels</H1>
        </View>
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
                L'appel entrant sera décroché automatiquement après 3 secondes.
              </Text>
            </React.Fragment>
          </TouchableRipple>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableRipple
            mode="outlined"
            dark
            style={{
              borderColor: 'white',
              borderRadius: 4,
              borderWidth: 1,
              marginTop: 80,
            }}
            onPress={() => {
              logActivity('return_from_user_settings')
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
      </View>
    </GradientBackground>
  )
}

export default UserSettingsScreen
