import React, { Component, PureComponent } from 'react';
import { View, Platform, TouchableOpacity, Button } from 'react-native';
//import styles from './styles';
import { Appbar } from 'react-native-paper';

const Header = (onAddPress, onCallPress, subtitle, title, showBack, navigation) => {
    
    const state = {
        searchQuery: '',
        isFocused: false
    };

    const onFocus = () => {
        setState(
            {
                isFocused: true
            },
            () => {
                navigation.navigate('SearchScreen');
                setTimeout(() => {
                    searchTextInput.focus();
                }, 240);
            }
        );
    };

    const onBlur = () => {
        setState({
            isFocused: false
        });
    };

    const onPress = () => {
        if (isFocused) {
            setState({
                isFocused: false
            });
            navigation.pop();
        } else {
            onFocus();
        }
    };

    const goBack = (navigation) => {
        console.log("go back testounet")
        console.log(navigation)
        navigation.pop()
    }

        //const index = this.props.navigation.state.index;
        //const route = this.props.navigation.state.routes[index]
        console.log("Header render")
        console.log(navigation)
        console.log("========")
        const activeScreen = navigation.state.routeName;
        return (
            <View style={styles.elevatedContainer}>
                <Appbar.Header style={styles.toolbar}>
                    {showBack && <Button onPress={goBack}  title="Back"/>}
                    <Appbar.Content title={title} subtitle={subtitle}/>
                    {onCallPress && <Button onPress={onCallPress} title="Skype" />}
                    {onAddPress &&  <Button onPress={onAddPress} title="Valider" /> }
                </Appbar.Header>
            </View>
        );
}

export default Header