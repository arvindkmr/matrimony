import React from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

const { width, height } = Dimensions.get('window')
const imgHeight = Math.round(height * (70 / 100))

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={[styles.onBoardButton,]} {...props}>
        <Text style={{
            fontSize: 16, color: '#F5CF04',
            fontFamily: "Roboto-Medium",
        }}>Skip</Text>
    </TouchableOpacity>
)
const Done = ({ ...props }) => (
    <TouchableOpacity
        style={styles.onBoardButton} {...props}>
        <Text style={{ fontSize: 16, color: '#F5CF04' }}>Done</Text>
    </TouchableOpacity>
)

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={[styles.onBoardButton,]} {...props}>
        <Text style={{
            fontSize: 16, color: '#F5CF04',
            fontFamily: "Roboto-Medium",
        }}>Next</Text>
    </TouchableOpacity>
)

const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? '#F5CF04' : '#D0CCCC';
    return (
        <View style={{
            width: 8, height: 8, borderRadius: 4, backgroundColor, marginHorizontal: 3,
        }}></View>
    )
}

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            style={styles.container}
            onSkip={() => navigation.replace("Welcome")}
            onDone={() => navigation.replace("Welcome")}
            DotComponent={Dots}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            bottomBarColor="#fff"
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image />,
                    title:
                        <View style={styles.onboardingContainer}>
                            <Image source={require('../../assets/images/onBoarding/1.jpg')} style={styles.image} />
                            <View style={styles.customTitle}>
                                <Text style={styles.customHeading}>Dhanadara</Text>
                            </View>
                            <View style={styles.customSubtitleWrapper}>
                                <Text style={styles.customSubtitle}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan nunc, suscipit .
                                </Text>
                            </View>
                        </View>,
                    subtitle: <></>

                },
                {
                    backgroundColor: '#fff',
                    image: <Image />,
                    title:
                        <View style={styles.onboardingContainer}>
                            <Image source={require('../../assets/images/onBoarding/2.jpg')} style={styles.image} />
                            <View style={styles.customTitle}>
                                <Text style={styles.customHeading}>Welcome</Text>
                            </View>
                            <View style={styles.customSubtitleWrapper}>
                                <Text style={styles.customSubtitle}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan nunc, suscipit .
                                </Text>
                            </View>
                        </View>,
                    subtitle: <></>

                },

            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        backgroundColor: '#fff',
    },
    onboardingContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        margin: 0,
    },
    image: {
        width: '100%',
        height: imgHeight,
        resizeMode: 'cover',
    },
    onBoardButton: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: "#fff",
        marginRight: 10,
        borderRadius: 20,
        width: 80,
        height: 35,
        backgroundColor: "transparent"
    },
    skipBtn: {
        backgroundColor: '#F5CF04',
        borderRadius: 22,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#f7f7f7',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    nextBtn: {
        height: 50,
        width: 50,
        backgroundColor: '#F5CF04',
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#f7f7f7',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    customTitle: {
        justifyContent: 'center', alignItems: 'center',
        marginTop: 30
    },
    customTitle2: {
        flexDirection: 'row'
    },
    customHeading: {
        color: '#000',
        fontSize: 22,
        marginBottom: 10,
        fontFamily: "Roboto-Bold"
    },
    customSubtitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    customSubtitle: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 28,
        fontFamily: "Roboto-Medium",
        color: '#817E7E'
    },
})