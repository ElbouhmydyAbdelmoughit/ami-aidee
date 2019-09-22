import React, { useState } from 'react';
import { Text, View, Keyboard, ScrollView } from 'react-native';
import { Button, TextInput, Divider, Headline, Title, Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimeInput from 'src/ui/components/DateTimeInput'
import ImageInput from 'src/ui/components/ImageInput'
import { TextField } from 'react-native-material-textfield';
import styles from './styles';
import { subjects, moments, reccurences } from 'src/utils'

import _ from 'lodash'

const ReminderForm = ({ handleChange, handleSubmit, handleCancel, values }) => {

    const state = {
        isDateTimePickerVisible: false,
        checked: false,
        img: null
    };

    const onChange = (value) => {
        debounce(handleChange(value), 250)
        //this.props.handleChange(value)
    }

    console.log("values")
    console.log(values)

    return (
        <ScrollView>
            <View style={styles.form}>

                <TextField
                    label="Nom de l'aidé"
                    multiline={false}
                    placeholder={"nom de la personne aidé"}
                    value={values && values.name}
                    onChangeText={_.debounce(handleChange('name'), 500)} />

                <Dropdown
                    onChangeText={_.debounce(handleChange('sujet'), 500)}
                    value={values && values.sujet || ""}
                    label='Sujet' data={subjects} placeholder={"Choisir un sujet"} />

                <TextField
                    label='Activité'
                    multiline={true}
                    placeholder={"Décrire l'activité"}
                    value={values && values.activite}
                    onChangeText={_.debounce(handleChange('activite'), 500)} />

                <View style={styles.momentSection}>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            onChangeText={handleChange('moment')}
                            placeholder={"quand ?"}
                            label={"Moment de la diffusion"}
                            value={values && values.moment || ""}
                            data={moments} />
                    </View>
                    <DateTimeInput
                        mode={"time"}
                        showIcon={true}
                        placeholder={""}
                        datePickerProps={{ width: 80 }}
                        value={values && values.momentDate}
                        onChangeText={handleChange('momentDate')} />
                </View>

                <View style={styles.momentSection}>
                    <DateTimeInput
                        label={"Jour de la diffusion"}
                        placeholder={""}
                        mode={"date"}
                        showIcon={false}
                        value={values && values.diffusionStartDate}
                        onChangeText={handleChange('diffusionStartDate')} />

                    <DateTimeInput
                        label={"Jusqu'au"}
                        placeholder={""}
                        mode={"date"}
                        value={values && values.diffusionEndDate}
                        onChangeText={handleChange('diffusionEndDate')} />

                </View>

                <Dropdown
                    onChangeText={_.debounce(handleChange('reccurence'), 500)}
                    label='Récurrence'
                    value={values && values.reccurences || ""}
                    data={reccurences} placeholder={"Choisir une réccurence"} />

                <TextField
                    label='Localisation'
                    multiline={true}
                    placeholder={"Où est-ce ?"}
                    value={values && values.location}
                    onChangeText={_.debounce(handleChange('location'), 500)} />

                <ImageInput
                    source={values.imageURL}
                    onChangeImage={handleChange('imageURL')} />

                <Divider style={styles.divider} />

                <View style={styles.momentSection}>
                    <Button onPress={handleCancel} >Annuler</Button>
                    <Button mode={"contained"} onPress={handleSubmit} >Valider</Button>
                </View>

            </View>
        </ScrollView>
    );
}

export default ReminderForm