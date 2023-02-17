import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SecondaryBtn = ({ onPress, title, width, ...rest }) => {
    return (
        <TouchableOpacity
            style={[styles.primaryBtn, { width: width ? width : '100%', ...rest }]}
            onPress={() => onPress()}>
            <Text style={styles.primaryBtnTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(SecondaryBtn)

const styles = StyleSheet.create({
    primaryBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 50,
        borderRadius: 6,
        marginVertical: 15,
        backgroundColor: 'transparent',
        borderWidth:1,
        borderColor:'#F5CF04'
    },
    primaryBtnTxt: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Roboto-Bold',
    },
})


// import React from 'react'
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';

// const Button = ({ onPress, title, width }) => {
//     return (
//         <TouchableOpacity
//             style={[styles.solidBtnWrapper, { width: width ? width : '100%' }]}
//             onPress={() => onPress()}>
//             <LinearGradient
//                 start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.75 }}
//                 // colors={['#F5B6B651','#F1AEAE75', '#F5CF04']}
//                 colors={['#F1AEAE75', '#F5CF04']}
//                 // useAngle={true}
//                 style={[styles.solidBtn, { width: width ? width : '100%' }]}>
//                 <Text style={styles.solidBtnTxt}>{title}</Text>
//             </LinearGradient>
//         </TouchableOpacity>
//     )
// }

// export default Button

// const styles = StyleSheet.create({
//     solidBtnWrapper:{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: 45,
//         marginVertical: 15,
//         borderRadius: 45,
//         shadowColor: '#6A98DC',
//         backgroundColor:'#fff',
//         elevation: 5,
//         // for ios below
//         shadowOffset: { width: 5, height: 5 },
//     },
//     solidBtn: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: 45,
//         borderRadius: 45,
//     },
//     solidBtnTxt: {
//         fontSize: 16,
//         color: '#fff',
//         fontFamily: "Roboto-Bold",
//     },
// })
