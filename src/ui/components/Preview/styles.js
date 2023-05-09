import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  video: {
    width: '30%',
    height: '100%',
  },

  preview: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: {
    marginTop: 20,
    marginBottom: 20,
  },

  body: {
    width: '70%',
    margin: 10,
    justifyContent: 'space-between',
    height: '90%',
    alignItems: 'center',
  },
})

export default styles
