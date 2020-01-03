import React, { useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import SolarScreen from './SolarScreen';

let redirected = false;


const RedirectToAction = ({ messageToNotify, ...otherProps }) => {
    const shouldRedirect = !redirected && messageToNotify; 
    useEffect(() => {
        if (shouldRedirect) {
            Actions.home({ redirectFromSolarView: true })
            redirected = true;
        }
    }, [messageToNotify]);
    if (shouldRedirect) {
        return null;
    }
    return <SolarScreen {...otherProps} />
}

export default RedirectToAction;