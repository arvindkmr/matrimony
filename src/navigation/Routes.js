import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import Splash from '../screens/authScreens/Splash';

const Routes = () => {
    const { userToken } = useState(false)

    const [splash, setSplash] = useState(true)

    useEffect(() => {
        let timeOut = setTimeout(() => { setSplash(false) }, 1500)
        return () => clearTimeout(timeOut)
    }, [])

    if (splash) return <Splash />
    else
     return (
        <NavigationContainer>
            {
                userToken
                    ?
                    <AuthStack /> :
                    <AppStack />
            }
        </NavigationContainer >
    )
}

export default Routes