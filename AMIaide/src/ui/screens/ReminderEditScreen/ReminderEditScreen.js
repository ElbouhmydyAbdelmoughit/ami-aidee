import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import Config from 'react-native-config';
import { Formik } from 'formik';

import ReminderForm from 'src/ui/components/ReminderForm'
import styles from './styles';

import { Navigation } from 'react-native-navigation';
//import { CAMERA_RECORD_SCREEN, pushPreviewScreen } from 'src/ui/navigation';

import { subjects, moments, reccurences } from 'src/utils'

const ReminderEditScreen = ({ componentId, reminder }) => {

    const handleSubmit = () => {
        //console.log("submit")
    }

    // componentDidMount() {
    //     // Orientation.lockToLandscape()    
    // }

    // componentWillUnmount() {
    //     //Orientation.lockToPortrait()
    //     //Orientation.unlockAllOrientations()
    // }

    const handleCameraRecordAction = (values) => {
        const { video_url } = values
        values.videoUri = video_url && `${Config.API_URL}/${video_url}` || ""
        Navigation.push(componentId, {
            component: {
                name: CAMERA_RECORD_SCREEN,
                passProps: {
                    values
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

    const {
        activite,
        auxiliary,
        diffusion_end_date,
        diffusion_start_date,
        helped_user,
        location,
        moment,
        moment_time,
        picture_url,
        reccurence,
        subject
    } = reminder

    const getIntOrDefault = (index) => {
        return index && (typeof index == 'string' ? parseInt(index) : index) || 0
    }

    const values = {
        name: helped_user && (`${helped_user.firstname} ${helped_user.lastname}`) || "",
        sujet: subjects[getIntOrDefault(subject)].value,
        activite: activite || "",
        moment: moments[getIntOrDefault(moment)].value,
        momentDate: moment_time || "",
        diffusionStartDate: diffusion_start_date || "",
        diffusionEndDate: diffusion_end_date || "",
        reccurence: reccurences[getIntOrDefault(reccurence)].value,
        location: location || "",
        imageURL: picture_url && `${Config.API_URL}/${picture_url}` || ""
    } //);

    //console.log("render edit form")
    //console.log(this.props)

    //const { store } = this.props.reminderStore
    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={values}
                onSubmit={values => {
                    handleCameraRecordAction(values)
                }}>
                {({ handleChange, handleSubmit, handleCancel, values }) => (
                    <ReminderForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                        values={values} />
                )}
            </Formik>
        </SafeAreaView>
    );
}

export default ReminderEditScreen