import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Image, View, PixelRatio, Dimensions, ImageBackground } from 'react-native'
import * as Animatable from 'react-native-animatable'

const { width, height } = Dimensions.get('window')

const Splash = ({ navigation }) => {

    return (
        <View  style={styles.container}>
            <StatusBar backgroundColor={'transparent' } />
            <Animatable.Image animation="zoomInUp" iterationCount={1} duration={1000} delay={100}
                style={styles.logo}
                source={require('../../assets/images/logo.jpeg')}>
            </Animatable.Image>
            <Animatable.Text animation="zoomInUp" iterationCount={1} duration={1000} delay={100}
                style={styles.logoText}>Matrimony
            </Animatable.Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: "#000"
    },
    logo: {
        maxWidth: width - 60,
        // height: '30%',
        resizeMode: 'contain',
        left: 20
    },
    logoText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
        fontFamily: 'Roboto-Bold',
        color:'#fff',
        top: 540,
        position: 'absolute'
    }
})
