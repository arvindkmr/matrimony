import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'



export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}


const getFcmToken = async () => {
    let FcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(FcmToken, "the Token")
    if(!FcmToken){
       
        try{
            const FcmToken = await messaging().getToken();
            if(FcmToken){
                console.log(FcmToken, "the new generated")
                await AsyncStorage.setItem('fcmToken', FcmToken)
            }
        }
        catch(error){
            console.log(error, "Error raised in fcmToken")
            showError(error.message)

        }
    }
}