import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, PixelRatio, Dimensions, Image, StatusBar, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button'
import SecondaryBtn from '../../components/SecondaryBtn';

const { width, height } = Dimensions.get('screen')

const Welcome = ({ navigation }) => {



    useEffect(() => {
    }, [])

    return (
        <ImageBackground style={styles.container}
            source={require('../../assets/images/onBoarding/Welcome.jpg')}
        >
            {/* <StatusBar translucent backgroundColor='transparent' barStyle='light-content' /> */}

            <Image style={styles.fullWidthImage}
                source={require('../../assets/images/onBoarding/welcome_wallet.png')}></Image>

            <View style={{ alignItems: 'center', maxWidth: '80%', alignSelf: 'center' }}>
                <Text style={styles.heading}>Manage your money</Text>
                <Text style={styles.heading}>with us!</Text>
                <Text style={[styles.regTxt, { textAlign: 'center', color: '#7B7676' }]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan nunc, suscipit .
                </Text>
            </View>

            <View style={styles.btnsWrapper}>
                <Button title='Log in' width={'80%'}
                    onPress={() => navigation.navigate("Login")
                    } />

                <SecondaryBtn title='Create an account' width={'80%'}
                    onPress={() => navigation.navigate("Register")
                    } />
            </View>
        </ImageBackground>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
    },
    heading: {
        // fontSize: 18,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
        color: '#000',
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
    },
    subHeadingBold: {
        // fontSize: 16,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
        fontFamily: "Roboto-SemiBold",
    },
    subHeading: {
        // fontSize: 16,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: '#000',
        fontFamily: "Roboto-Medium",
    },
    smTxt: {
        // fontSize: 12,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.5),
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    regTxt: {
        // fontSize: 14,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.5),
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    fontMedium: {
        fontFamily: 'Roboto-Medium'
    },

    fullWidthImage: {
        maxWidth: width - 60,
        resizeMode: 'contain'
    },

    btnsWrapper: {
        marginBottom: 100,
        width: '100%',
        alignItems: 'center'
    },
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 40,
        marginVertical: 15,
        borderRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F5CF04'
    },
    solidBtnTxt2: {
        fontSize: 16,
        color: '#fff',
        fontFamily: "Poppins-Regular",
    },
    whiteBtn: {
        backgroundColor: 'transparent',
        marginTop: 0,
        fontWeight: 500,
        color: "#fe0000"
    },

})
