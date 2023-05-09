import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import AppStyles from 'config/styles'
import React, { useEffect, useState } from 'react'
import {
  Linking,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { Button, Dialog } from 'react-native-paper'

const CguModal = ({ onDismiss }) => {
  const [showCguModal, setShowCguModal] = useState(false)
  const showCguModalQuery = useQuery({
    queryKey: ['showCguModal'],
    queryFn: async () => {
      const item = await AsyncStorage.getItem('@showCguModal')
      return item
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (showCguModalQuery.data === 'true' || showCguModalQuery.data === null) {
      setShowCguModal(true)
    } else if (showCguModalQuery.data === 'false') {
      setShowCguModal(false)
    }
  }, [showCguModalQuery.data])

  const { height, width } = useWindowDimensions()

  if (!showCguModal) {
    return null
  }

  return (
    <View style={[styles.mainContainer, { width, height }]}>
      <Dialog visible={true} dismissable={false}>
        <Dialog.Title>Conditions générales d’utilisation</Dialog.Title>
        <Dialog.Content>
          <Text
            onPress={() => {
              Linking.openURL(
                'https://www.ami-solution.eu/conditions-generales-dutilisation/'
              )
            }}
          >
            Vous devez accepter les{' '}
            <Text
              style={styles.dialogText}
              onPress={() => {
                Linking.openURL(
                  'https://www.ami-solution.eu/conditions-generales-dutilisation/'
                )
              }}
            >
              conditions générales d'utilisations
            </Text>{' '}
            pour accéder au contenu de l'application.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => onDismiss()}>Refuser</Button>
          <Button
            onPress={async () => {
              await AsyncStorage.setItem('@showCguModal', 'false')
              await queryClient.invalidateQueries()
            }}
          >
            Accepter
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
  },
  dialogText: {
    color: AppStyles.colors.primary,
  },
})

export default CguModal
