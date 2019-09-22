import { StyleSheet } from 'react-native';
import AppStyles from 'src/config/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.colors.primary
    },

    list: {
        backgroundColor: "#FFF"
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
});

export default styles;