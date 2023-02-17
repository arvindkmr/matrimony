import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';


const Home = () => {

    const { logout, fetching, setFetching } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Text>
                Home Screen
            </Text>
            <TouchableOpacity style={styles.Logout} onPress={()=>{logout()}} >
                <Text>
                    logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Home