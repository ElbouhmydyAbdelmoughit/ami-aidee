import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'

export const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
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
