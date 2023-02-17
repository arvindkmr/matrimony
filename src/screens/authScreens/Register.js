import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../../components/Button'
import Input from '../../components/Input'
import BaseScreen from '../../components/BaseScreen'
import Loader from '../../components/Loader'
import { AuthContext } from '../../navigation/AuthProvider'
// import { registerAnimation } from 'react-native-animatable'

const themeColor =
    '#f33'

const Register = ({ navigation }) => {

    return (
        <BaseScreen title={'Sign Up'} renderChild={Content({ navigation })}
            navigation={navigation} />
    )
}

const Content = ({ navigation }) => {

    const { register, fetching, setLoading } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [mobile, setmobile] = useState()
    const [referal, setReferal] = useState()
    const [password, setPassword] = useState()

    const [securePwd, setsecurePwd] = useState(true)
    const [errors, setErrors] = useState({})
    const [isSelected, setIsSelected] = useState(false)

    const validate = () => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        let errors = {}
        if (!name) {
            errors.name = "Name is required"
            setErrors(errors)
            return false
        }
        
        else if (!mobile) {
            errors.mobile = "Mobile is required"
            setErrors(errors)
            return false
        }
        else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
            errors.mobile = 'Invalid mobile no';
            setErrors(errors)
            return false
        }
        else if (!password) {
            errors.password = "Password is required"
            setErrors(errors)
            return false
        }
        else if (!strongRegex.test(password)) {
            errors.password = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
            setErrors(errors)
            return false
        }
        else if (!isSelected) {
            errors.selected = 'Accept the terms and conditions for getting started'
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const handleSubmit = () => {
        let isValid = validate()
        if (isValid === true) {
            register(name,  mobile, password,referal, navigation)



        }
    }

    return (

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>

            <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, marginBottom: 25 }}>
                <Text style={{
                    fontSize: 16, color: '#000', fontWeight: '600', alignSelf: 'center', marginBottom: 3,
                    fontFamily: "Roboto-Bold",
                }}>Sign up to Referral Magic </Text>
                <Text style={{
                    fontSize: 14, color: '#C4C4C4', fontWeight: '600', alignSelf: 'center',
                    fontFamily: "Roboto-Regular",
                }}>Create your account</Text>
            </View>

            <Input
                name="name" value={name} placeholder='Full name'
                error={errors.name ? true : false}
                keyboardType='default'
                iconType={1}
                onChangeText={setName}>
            </Input>
            {errors.name ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.name}</Text>
                : null
            }

            {/* <Text style={styles.label}>Email</Text> */}
           

            {/* <Text style={styles.label}>Mobile</Text> */}
            <Input
                name="mobile" value={mobile} placeholder='Enter 10 digit Mobile No' keyboardType='phone-pad'
                error={errors.mobile ? true : false}
                onChangeText={setmobile}>
            </Input>
            {errors.mobile ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.mobile}</Text>
                : null
            }
            {/* <Text style={styles.label}>Password</Text> */}
            <Input
                name="password" value={password} placeholder='Password' keyboardType='default'
                error={errors.password ? true : false}
                onChangeText={setPassword}>
            </Input>
            {errors.password ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.password}</Text>
                : null
            }



            <Input
                name="referal" value={referal} placeholder='referal number' keyboardType='default'
                icon='dialpad'
                iconType={1}
                
                onChangeText={setReferal}>
            </Input>
            {/* <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={() => setIsSelected(!isSelected)}>
                    {isSelected ?
                        <MaterialIcons name='check' size={20} color="#F5CF04"></MaterialIcons>
                        : null
                    }
                </TouchableOpacity>
                <Text style={styles.label}>I accept the </Text>
                <TouchableOpacity style={styles.forgotBtnWrapper}
                    onPress={() => { }}>
                    <Text style={styles.forgotBtn}>Terms & Conditions</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={() => setIsSelected(!isSelected)}>
                    {isSelected ?
                        <MaterialIcons name='check' color="#F5CF04" size={20}></MaterialIcons>
                        : null
                    }
                </TouchableOpacity>
                <Text style={styles.solidBtnTxt2}>I accept the<Text style={[styles.solidBtnTxt2, { color: '#F5CF04', fontFamily: "Roboto-Bold", }]}> Terms & Conditions</Text></Text>
            </View>
            {errors.selected ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: 5 }}>{errors.selected}</Text>
                : null
            }

            <Button title='Sign up' onPress={() => {
                handleSubmit()
            }} />

            <TouchableOpacity style={[styles.solidBtn, styles.whiteBtn]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.solidBtnTxt2, { color: "#777" }]}>Already have an account?
                    <Text style={[styles.solidBtnTxt2, { color: '#F5CF04', fontFamily: "Roboto-Bold", }]}> Sign in</Text></Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    rowAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    label: {
        color: '#000',
        fontSize: 16,
        marginVertical: 10,
        fontFamily: "Roboto-Regular",
    },
    whiteTxt: {
        color: '#aaa',
        fontSize: 18,
        marginVertical: 10,
        fontFamily: "PTSans-Regular",
    },
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // borderWidth: 1, borderColor: '#fff'
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
        height: 40,
        borderRadius: 25,
        backgroundColor: '#4267B2',
    },
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#F5CF04',
        fontWeight: '600',
        fontFamily: "PTSans-Bold",
    },
    solidBtnTxt2: {
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
    whiteBtn: {
        backgroundColor: 'transparent',
        marginTop: 0,
        color: "#F5CF04"
    },
    checkboxContainer: {
        flexDirection: "row", alignItems: 'center',
        marginLeft: 10,
        // borderWidth: 1,
    },
    checkbox: {
        alignSelf: "center",
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
        width: 25,
        height: 25,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#F5CF04'
    },

    forgotBtnWrapper: {
        alignSelf: 'flex-end',
        // marginBottom: 25, marginTop: 10,
    },
    forgotBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f00'
    },

})
