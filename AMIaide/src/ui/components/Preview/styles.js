import { StyleSheet } from 'react-native';
import AppStyles from 'src/config/styles';

const styles = StyleSheet.create({

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
      },

      divider: {
        marginTop: 20,
        marginBottom: 20
      },

      video: {
        width: '30%', 
        height: '100%'
      },

      body: {
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        width: '70%',
        height: '90%',
      },
});

export default styles;