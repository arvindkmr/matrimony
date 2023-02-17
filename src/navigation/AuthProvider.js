import { View, Text } from 'react-native'
import React, { useState, useEffect, createContext, useReducer, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';
import messaging from '@react-native-firebase/messaging';
// import { getAppData } from '../screens/appScreens/AppData'

const AuthContext = createContext()

const AuthProvider = ({ children, navigation }) => {

    const BaseUrl = "https://shopninja.in/referal_magic/api2/public/index.php"

    const [userToken, setUserToken] = useState(null)
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [deviceId, setDeviceId] = useState(null)
    const [userDetails, setUserDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const [initialRoute, setInitialRoute] = useState('Drawer')

    const initialFetch = {
        loading: false,
        success: false,
        error: false,
        response: false
    }
    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'setLoading': return { ...state, loading: action.value }
            case 'setSuccess': return { ...state, success: action.value }
            case 'setError': return { ...state, error: action.value }
            case 'setResponse': return { ...state, response: action.value }
            case 'reset': return initialFetch
            default: return state
        }
    }
    const [fetching, setFetching] = useReducer(fetchReducer, initialFetch)

    const initialAppData = {
        patients: "",
    }
    const dataReducer = (state, action) => {
        switch (action.type) {
            case 'setPatients': return { ...state, patients: action.value }
            default: return state
        }
    }
    const [appData, setAppData] = useReducer(dataReducer, initialAppData)

    const getToken = async () => {
        await AsyncStorage.getItem('userToken').then(value => {
            if (value !== null) {
                setUserToken(value)

            }
        })
    }
    const getFcmToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log('FCM token registered:', token);
            setDeviceId(token)
            console.log('FCM token length:', token.length);
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    }
    const getIntialLaunch = () => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            }
        })
    }

    const getApiData = (id) => getAppData(id, setFetching, setAppData)

    useEffect(() => {
        getToken()
        // getFcmToken()
        getIntialLaunch()
    }, [])


    const AcceptAmount = async () => {

        navigation.navigate('Money')
    }









    return (
        <AuthContext.Provider value={{
            userToken, fetching, setFetching, isFirstLaunch, setIsFirstLaunch, appData, setAppData, BaseUrl, userDetails, setUserDetails,

            login: async (mobile, password) => {
                console.log(mobile, password, 'username,password entered are')
                setFetching({ type: 'setLoading', value: true })

                var form = new FormData()
                // form.append('email', email);
                form.append('mobile', mobile);
                form.append('password', password);
                form.append('device_id', deviceId);
                await axios.post(BaseUrl + "/customer_login", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer_login Api successful')
                        setFetching({ type: 'setLoading', value: false })


                        if (response.data.status === 200) {
                            setUserToken(response.data.msg.cust_id)
                            AsyncStorage.setItem('userToken', response.data.msg.cust_id)
                            setUserDetails(response.data.msg)

                        }
                        else if (response.data.status === 400) {
                            // alert(response.data.msg)
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })
                        }
                        else {
                            setMessage(response.data.msg)
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })
                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })

            },

            register: async (name,  mobile, password, referal, navigation) => {
                // console.log(email, password, 'username,password entered are')
                setFetching({ type: 'setLoading', value: true })
                var form = new FormData()
                form.append('name', name);
                // form.append('email', email);
                form.append('mobile', mobile);
                form.append('password', password);
                form.append('referral_code', referal);

                form.append('device_id', deviceId);
                form.append('platform', '1');
                console.log(name, mobile, password, deviceId)
                await axios.post(BaseUrl + "/customer_signup", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer_signup Api successful')
                        setFetching({ type: 'setLoading', value: false })

                        if (response.data.status === 200) {
                            setUserDetails(response.data.msg)

                            navigation.navigate('Otp', { mobile: mobile })

                        }
                        else {
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })
                            setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })
                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })
            },
            verifyOtp: async (mobile, otp, navigation) => {
                console.log(mobile, otp, 'email,mobile entered are')
                setFetching({ type: 'setLoading', value: true })


                var form = new FormData()
                form.append('mob', mobile);
                form.append('otp', otp);
                await axios.post(BaseUrl + "/rm_verify_otp", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data.msg, 'rm Api successful')
                        setFetching({ type: 'setLoading', value: false })
                        if (response.data.status === 200) {
                            console.log(response.data)
                            navigation.navigate('Money')



                        }
                        else {
                            setMessage(response.data.msg)
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })
                        console.log(error, 'error while fetching rm_verify_otp Api')
                        setLoading(false)
                    })
            },

            updateprofile: async (name, email,) => {
                // console.log(email, password, 'username,password entered are')
                setFetching({ type: 'setLoading', value: true })

                var form = new FormData()
                form.append('cust_id', userToken);
                console.log(userToken)
                form.append('cust_name', name);
                form.append('cust_email', email);


                await axios.post(BaseUrl + "/update_profile", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'successful')
                        setFetching({ type: 'setLoading', value: false })

                        if (response.data.status === 200) {
                            console.log('Sucess update')
                            // AsyncStorage.setItem('userToken', userToken)
                            setFetching({ type: 'setSuccess', value: { heading: " Success !", data: response.data.msg } })
                        }
                        else {
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })
                            setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })
                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })
            },

            PaymentSucesss: async () => {
                setFetching({ type: 'setLoading', value: true })

                let form = new FormData()


                form.append("customer_id", userDetails.cust_id)
                console.log(userDetails.cust_id)
                form.append("amount", 500)
                form.append('payment_status', 1)

                await axios.post("https://shopninja.in/referal_magic/api2/public/index.php/ref_checkout", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'Money api')
                        setFetching({ type: 'setLoading', value: false })

                        if (response.data.status === 200) {
                            console.log("money send")
                            setUserToken(userDetails.cust_id)
                            // getApiData(100)
                            AsyncStorage.setItem('userToken', userDetails.cust_id)


                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })
                        console.log(error, 'error while fetching getcart api')
                        setLoading(false)
                    })
            }
            ,
            changePwd: async (newPassword, confirmPassword, navigation) => {
                setFetching({ type: 'setLoading', value: true })

                var form = new FormData()
                form.append('cust_id', userDetails.cust_id)
                form.append('new_pass', newPassword)
                form.append('confirm_pass', confirmPassword);




                await axios.post(BaseUrl + "/change_password_cust", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer change Password Api successful')
                        setFetching({ type: 'setLoading', value: false })

                        if (response.data.status === 200) {
                            // setUserDetails(response.data.msg)
                            console.log(userDetails.cust_id)
                            console.log(newPassword, 'Sucess')

                            setFetching({ type: 'setSuccess', value: { heading: " Success !", data: response.data.msg } })
                            setTimeout(() => {
                                navigation.goBack()
                            }, 200);
                        }
                        else {
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })
                            setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        setFetching({ type: 'setError', value: { heading: " Error !", data: 'Network Issue' } })
                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })

            }
            ,




            sendOtp: async (mobile, navigation) => {
                setFetching({ type: 'setLoading', value: true })

                var form = new FormData()
                form.append('mob', mobile);

                await axios.post(BaseUrl + "/rm_send_otp", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        setFetching({ type: 'setLoading', value: false })

                        if (response.data.status == 200) {
                            // navigation.navigate('Otp', { mobile: mobile })
                            console.log(response.data.msg)
                            setFetching({ type: 'setSuccess', value: { heading: " Success !", data: response.data.msg } })

                        }

                        else {
                            setMessage(response.data.msg)
                            setFetching({ type: 'setError', value: { heading: " Error !", data: response.data.msg } })

                        }
                    })
                    .catch((error) => {
                        setLoading(false)
                        console.log(error, 'error with api dn_send_otp')
                    })
            },

            logout: async () => {
                try {
                    setFetching({ type: 'setLoading', value: true })
                    await AsyncStorage.getItem('userToken').then((value) => console.log(value, 'is being logged out'))
                    await AsyncStorage.removeItem('userToken')
                    setUserToken(null)
                    setFetching({ type: 'setLoading', value: false })
                }
                catch (e) {
                    console.log(e)
                    setFetching({ type: 'setLoading', value: false })
                }
            },
        }}>
            {children}
        </AuthContext.Provider >
    )
}

export { AuthProvider, AuthContext }

// generate new debug.keystore ---
    // keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
    // see sha1 key --
    // keytool -exportcert -keystore ./android/app/debug.keystore -list -v