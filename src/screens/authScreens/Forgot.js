import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Alert, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../../components/Button'
import Input from '../../components/Input'
import BaseScreen from '../../components/BaseScreen'
import axios from 'react-native-axios'
import { AuthContext } from '../../navigation/AuthProvider'

const Forgot = ({ navigation, route }) => {

    return (
        <BaseScreen title={'Forgot'} navigation={navigation} renderChild={Content({ navigation, route })} />
    )
}

const Content = ({ navigation, route }) => {

    // const { type } = route.params
    const { BaseUrl, } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [apiMsg, setApiMsg] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        let errors = {}
        if (!email) {
            errors.email = "Email is required"
            setErrors(errors)
            return false
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const forgotPwd = async () => {
        let isValid = validate()
        if (isValid === true) {
            navigation.navigate('Login')
            // setLoading(true)
            // await axios.post(BaseUrl + "/forgotUserPwd",
            //     {
            //         email: email,
            //     }
            // )
            //     .then((response) => {
            //         setLoading(false)
            //         console.log(response.data, 'forgotUserPwd Api successful')
            //         if (response.data.status === 200) {
            //             setMessage(response.data.msg)
            //         }
            //         else {
            //             setMessage(response.data.msg)
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error, 'error while fetching forgotUserPwd Api')
            //         setLoading(false)
            //         setMessage(error.message)
            //     })
        }
    }

    useEffect(() => {
    }, [])


    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>

            <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, marginBottom: 25 }}>
                <Text style={{
                    fontSize: 16, color: '#000', fontWeight: '600', alignSelf: 'center', marginBottom: 3,
                    fontFamily: "Roboto-Bold",
                }}>Forgot Password </Text>
                <Text style={{
                    fontSize: 14, color: '#C4C4C4', alignSelf: 'center', textAlign: 'center',
                    fontFamily: "Roboto-Regular",
                }}>Please enter your email address to recover
                    your password</Text>
            </View>


            <Text style={styles.whiteTxt}>Email</Text>

            <Input
                name="email" value={email} placeholder='Enter Email Id'
                error={errors.email ? true : false}
                keyboardType='email-address'
                onChangeText={setEmail}>
            </Input>
            {errors.email ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.email}</Text>
                : null
            }

            <Button title='Submit' onPress={() => {
                forgotPwd()
                // navigation.navigate('Login')
            }} />

            <TouchableOpacity style={[styles.solidBtn, styles.whiteBtn]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.solidBtnTxt}>You remember your password ?<Text style={[styles.solidBtnTxt, { color: '#F5CF04', fontFamily: "Roboto-Bold", }]}> Log in</Text></Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default Forgot

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
        fontFamily: "Roboto-Regular",
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
        alignItems: 'center',
        width: '100%',
        height: 45,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#000',
        fontFamily: "Roboto-Regular",
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
        justifyContent: 'flex-start',
        width: '100%', height: 55,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#444',
        borderWidth: 1,
        borderColor: '#666'
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        width: 40, height: '100%',
    },
    Input: {
        width: '90%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontFamily: "PTSans-Regular",
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
        marginTop: 70
    },
})
