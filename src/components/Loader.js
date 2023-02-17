import React, { useContext } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'

const Loader = () => {

    const { fetching, setFetching } = useContext(AuthContext)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={fetching.loading ? true : false}
            onRequestClose={() => {
                setFetching({ type: 'setLoading', value: false })
            }}
        >
            <View style={styles.container}>
                <ActivityIndicator size='large' color="#8B0000" style={{ fontSize: 50 }} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        flex: 1,
        backgroundColor: '#0000003D',
        zIndex: 100,
        justifyContent: 'center', alignItems: 'center'
    }
})
export default Loader
