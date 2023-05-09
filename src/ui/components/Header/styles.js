import { StyleSheet } from 'react-native'
import AppStyles from 'src/config/styles'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: AppStyles.colors.accent,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: AppStyles.colors.accent,
  },

  search: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    fontFamily: AppStyles.fonts.FONT_REGULAR,
  },
  elevatedContainer: {
    justifyContent: 'flex-end',
    height: null,
    elevation: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppStyles.colors.separator,
    backgroundColor: AppStyles.colors.black,
  },
  container: {
    justifyContent: 'flex-end',
    height: null,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppStyles.colors.separator,
    backgroundColor: AppStyles.colors.black,
  },
  btnText: {
    fontSize: 16,
    fontFamily: AppStyles.fonts.FONT_REGULAR,
    color: '#7f8c8d',
  },
  btn: {
    width: '75%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 40,
  },
})

export default styles
