import React, { useEffect } from 'react';
import { FAB } from 'react-native-paper';

import { AsyncStorage, Alert, SafeAreaView } from 'react-native';
import ReminderList from 'src/ui/components/ReminderList'
import styles from './styles';

import { Navigation } from 'react-native-navigation';
//import { REMINDER_EDIT_SCREEN } from 'src/ui/navigation';

const ReminderListScreen = ({ messagesRequest, componentId, list, loading }) => {

  const constructor = (props) => {
    props;

    Navigation.events().bindComponent();
  }

  const navigationButtonPressed = ({ buttonId }) => {
    switch (buttonId) {
      case 'nav_call_btn': {
        handleCall();
        break;
      }
      default:
        break;
    }
  }

  useEffect(() => {
    messagesRequest({})
  }, [])

  const handleNewReminderAction = (reminder) => {
    Navigation.push(componentId, {

      component: {
        name: REMINDER_EDIT_SCREEN,
        passProps: {
          reminder
        },
        options: {
          topBar: {
            title: {
              text: 'Rappel'
            }
          },
          layout: {
            orientation: ['portrait', 'landscape']
          }
        }
      }
    });
  };


  const handleCall = () => {
    Alert.alert(
      'Appeler via Skype',
      'Cette fonctionnalité n\'est pas encore disponible',
      [
        { text: 'OK', onPress: () => { } },
      ],
      { cancelable: true },
    );
  }

  const onAddPress = () => {
    //const { navigation } = this.props;
    //navigation.navigate('ReminderEditScreen');
    handleNewReminderAction({})
  };

  const onPress = (item) => {
    handleNewReminderAction(item)
    //const { navigation } = this.props;
    //navigation.navigate('ReminderEditScreen', {
    //    form: item
    //  });
  }

  const onRefreshing = () => {
    messagesRequest()
  }

  const setup = async () => {
    const reminders = await AsyncStorage.getItem("reminders")
    let list = JSON.parse(reminders);
    if (!list) {
      list = []
    }
    setState({ reminderList: list })
  }

  //this.setup()
  //const { store } = this.props.screenProps
  return (
    <SafeAreaView style={styles.container}>
      <ReminderList
        style={styles.list}
        loading={loading}
        onRefreshing={onRefreshing}
        onPress={onPress}
        data={Object.values(list).sort((a, b) => b.id - a.id)} />
      <FAB
        style={styles.fab}
        small
        icon="add"
        onPress={onAddPress} />
    </SafeAreaView>
  );
}

export default ReminderListScreen

