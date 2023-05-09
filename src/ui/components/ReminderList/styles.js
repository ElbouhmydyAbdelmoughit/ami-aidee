import { StyleSheet } from 'react-native'
import AppStyles from 'src/config/styles'

const styles = StyleSheet.create({
  watchAll: {
    fontWeight: 'bold',
    fontSize: 14,
    color: AppStyles.colors.accentColor,
  },

  separator: {
    width: '86%',
    marginLeft: '14%',
    height: 1,
    backgroundColor: '#CED0CE',
  },
  onlineDot: {
    width: 10,
    marginRight: 4,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppStyles.colors.onlineGreen,
  },
  nameView: {
    paddingHorizontal: 4,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 12,
  },
  listTopView: {
    padding: 100,
    paddingTop: 100,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemView: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headView: {
    marginHorizontal: 4,
    alignItems: 'center',
  },
  headText: {
    width: 64,
    textAlign: 'center',
    fontSize: 12,
  },
  headSub: {
    width: 48,
    margin: 4,
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: AppStyles.colors.grey,
    alignItems: 'center',
  },
  active: {
    fontWeight: 'bold',
    fontSize: 14,
    color: AppStyles.colors.grey,
  },
  absoluteView: {
    right: -2,
    position: 'absolute',
    bottom: -4,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: AppStyles.colors.white,
    backgroundColor: AppStyles.colors.white,
  },
})

export default styles
