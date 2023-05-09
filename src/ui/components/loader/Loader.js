import React from 'react'
import { ActivityIndicator,Modal, StyleSheet, View } from 'react-native'

export const modalStyles = StyleSheet.create({
  modalBackground: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00000040',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    width: 100,
    justifyContent: 'space-around',
    height: 100,
    display: 'flex',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
})

const Loader = ({ loading }) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={modalStyles.modalBackground}>
        <View style={modalStyles.activityIndicatorWrapper}>
          {loading && <ActivityIndicator animating />}
        </View>
      </View>
    </Modal>
  )
}

export default Loader
