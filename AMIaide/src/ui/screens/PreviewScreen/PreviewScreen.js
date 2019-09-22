import React, { Component } from 'react';
import { SafeAreaView, Text, Button, AsyncStorage } from 'react-native';
import Preview from 'src/ui/components/Preview'
import Loader from 'src/ui/components/Loader'

import UUIDGenerator from 'react-native-uuid-generator'
import { Navigation } from 'react-native-navigation';
//import { CAMERA_RECORD_SCREEN, pushReminderScreen } from 'src/ui/navigation';


import styles from './styles';

const PreviewScreen = ({data, values, form, videoUri}) => {

    const state = {
        isLoading: false
    };

    const constructor = (props) => {
        props
        Navigation.events().bindComponent();
    }
    
    const navigationButtonPressed = ({ buttonId }) => {
    
        switch (buttonId) {
          case 'nav_ok_btn': {
            handleSubmit();
            break;
          }
          default:
            break;
        }
    }

    const componentDidMount = () => {
        console.log("PreviewScreen")
        //console.log(this.props.navigation)
        //this.props.navigation.setParams({ addPress: this.handleAddPress });
       //Orientation.lockToLandscape()
    }

    const componentWillUnmount = () => {
        //Orientation.lockToPortrait()
        //Orientation.unlockAllOrientations()
    }

    const handleChange = () => {
        console.log("change")
    }

    const handleAddPress = () => {
        handleSubmit()
    }

    const handleSubmit = async () => {
        setState({isLoading:true})
        console.log("submit")
        console.log(values)

        var reminder = values.form
        reminder.videoUri = values.videoUri

        const id = componentId
        { messageCreateRequest }

        messageCreateRequest(values)
        setTimeout(function(){
            Navigation.mergeOptions(id, {
                layout: { orientation: ['portrait'] },
              });
            pushReminderScreen()
            console.log(Navigation)
        }, 2000);
    }

    const handleCancel = () => {
        navigation.goBack()
    }

        //console.log("render preview screen")
        //console.log(this.props)
        //this.props.navigation.popToTop()

        const formValues = values.form || {}
        const videoUriValues = values.videoUri || ""

        return (
            <SafeAreaView style={styles.container}>
                <Loader loading={state.isLoading}/>
               <Preview 
                form={formValues}
                videoUri={videoUriValues} />
            </SafeAreaView>
        );
    
}

export default PreviewScreen