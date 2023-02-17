import React, { useState, useContext, useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Alert, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../../components/Button'
import Input from '../../components/Input'
import BaseScreen from '../../components/BaseScreen'
import axios from 'react-native-axios'
import { AuthContext } from '../../navigation/AuthProvider'

const Otp = ({ navigation, route }) => {

    return (
        <BaseScreen title={'Otp'} navigation={navigation} renderChild={Content({ navigation, route })} notGoBack={true} />
    )
}

const Content = ({ navigation, route }) => {

    const { mobile } = route.params
    const { BaseUrl, loading, setLoading, verifyOtp, message, setMessage, sendOtp } = useContext(AuthContext)

    const [otp1, setotp1] = useState()
    const [otp2, setotp2] = useState()
    const [otp3, setotp3] = useState()
    const [otp4, setotp4] = useState()
    const [errors, setErrors] = useState({})

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()


    const validate = () => {
        let errors = {}
        if (!otp1) {
            errors.otp1 = "otp1 is required"
            setErrors(errors)
            ref1.current.focus()
            return false
        }
        
        else if (!otp2) {
            errors.otp2 = "otp2 is required"
            setErrors(errors)
            ref2.current.focus()
            return false
        }
        
        else if (!otp3) {
            errors.otp3 = "otp3 is required"
            setErrors(errors)
            ref3.current.focus()
            return false
        }
        
        else if (!otp4) {
            errors.otp4 = "otp4 is required"
            setErrors(errors)
            ref4.current.focus()
            return false
        }
        
        else {
            setErrors({})
            return true
        }
    }

    const handleSubmit=()=>{
        const isValid = validate()
        if(isValid){
            verifyOtp(mobile,otp1+otp2+otp3+otp4, navigation)
            // alert("Success")
        } 
    }


    // useEffect(() => {
    //     console.log(mobile, 'params data')
    //     ref1.current.focus()
    // }, [])


    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
            {message ?
                setTimeout(() => { setMessage('') }, 10000) && <Text style={{ color: 'red', marginVertical: 20 }}>{message}</Text>
                : null}


            {/* <Image source={require('../assets/images/logo.png')} style={{
                width: 150,
                height: 80,
                resizeMode: 'contain',
                alignSelf: 'center'
            }} /> */}

            <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', marginVertical: 20, marginBottom: 30 }}>
                <Text style={{
                    fontSize: 16, color: '#000', fontWeight: '600', alignSelf: 'center', marginBottom: 3,
                    fontFamily: "Poppins-Bold",
                }}>OTP Verification </Text>
                <Text style={{
                    fontSize: 14, color: '#C4C4C4', alignSelf: 'center', textAlign: 'center',
                    fontFamily: "Poppins-Regular",
                }}>We  have just sent a verification code to </Text>
            </View>


            {/* <Text style={styles.whiteTxt}>OTP</Text> */}

            <View style={styles.inputWrapper}>
                <TextInput
                    ref={ref1}
                    style={[styles.otpInput, { borderColor: errors.otp1 ? 'red' : '#C4C4C4' }]}
                    name="otp" value={otp1} placeholder='1'
                    keyboardType='number-pad'
                    maxLength={1}
                    onChangeText={(text) => {
                        setotp1(text)
                        text ? ref2.current.focus() : null
                    }}>
                </TextInput>

                <TextInput
                    ref={ref2}
                    style={[styles.otpInput, { borderColor: errors.otp2 ? 'red' : '#C4C4C4' }]}
                    name="otp" value={otp2} placeholder='1'
                    keyboardType='number-pad'
                    maxLength={1}
                    onChangeText={(text) => {
                        setotp2(text)
                        text ? ref3.current.focus() : ref1.current.focus()
                    }}>
                </TextInput>

                <TextInput
                    ref={ref3}
                    style={[styles.otpInput, { borderColor: errors.otp3 ? 'red' : '#C4C4C4' }]}
                    name="otp" value={otp3} placeholder='1'
                    keyboardType='number-pad'
                    maxLength={1}
                    onChangeText={(text) => {
                        setotp3(text)
                        text ? ref4.current.focus() : ref2.current.focus()
                    }}>
                </TextInput>

                <TextInput
                    ref={ref4}
                    style={[styles.otpInput, { borderColor: errors.otp4 ? 'red' : '#C4C4C4' }]}
                    name="otp" value={otp4} placeholder='1'
                    keyboardType='number-pad'
                    maxLength={1}
                    onChangeText={(text) => {
                        setotp4(text)
                        text ? null : ref3.current.focus()
                    }}>
                </TextInput>

            </View>

            <Button title='CONTINUE' onPress={() => {
                handleSubmit()
            }} />

            <TouchableOpacity style={[styles.solidBtn, styles.whiteBtn]}
                onPress={() => sendOtp(mobile)}>
                <Text style={[styles.solidBtnTxt, { color: '#fc9918', fontFamily: "Poppins-Bold", }]}>Resend OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.solidBtn, styles.whiteBtn]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.solidBtnTxt}>Log in using<Text style={[styles.solidBtnTxt, { color: '#fc9918', fontFamily: "Poppins-Bold", }]}> password</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.solidBtn, styles.whiteBtn]}
                onPress={() => navigation.navigate('Forgot')}>
                <Text style={styles.solidBtnTxt}>Having trouble in logging in?<Text style={[styles.solidBtnTxt, { color: '#fc9918', fontFamily: "Poppins-Bold", }]}> Get Help</Text></Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default Otp

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // borderWidth: 1, borderColor: '#fff'
    },
    whiteTxt: {
        color: '#000',
        fontSize: 18,
        marginLeft: 10,
        marginVertical: 10,
        fontFamily: "Poppins-Regular",
    },
    btnRow: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    socialBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4267B2',
    },
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: 45,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#000',
        fontFamily: "Poppins-Regular",
    },
    inputLabel: {
        color: '#35aecb',
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 10,
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%', height: 65,
        marginBottom: 20,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#666'
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        width: 40, height: '100%',
    },
    otpInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 55,
        textAlign: 'center',
        paddingHorizontal: 5,
        fontSize: 18,
        color: '#000',
        borderBottomWidth: 1,
        // fontFamily: "Poppins-Regular",
    },
    orWrapper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 40,
    },
    orline: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderTopColor: '#aaa',
        borderTopWidth: 1,
        width: '30%',
    },
    orTxt: {
        // marginTop: -16.5,
        fontSize: 20, fontWeight: '600',
        backgroundColor: 'transparent',
        color: '#aaa',
        width: 50,
        textAlign: 'center'
    },
    forgotBtnWrapper: {
        alignSelf: 'flex-end',
        marginBottom: 25, marginTop: 10,
    },
    forgotBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f00'
    },
    whiteBtn: {
        backgroundColor: 'transparent',
        margin: 0
    },
})