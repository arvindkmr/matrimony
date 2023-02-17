import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  AppState,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from './AuthProvider';
import HomeScreen from '../screens/appScreens/HomeScreen';
import Home from '../screens/appScreens/Home';
import DrawerContent from '../components/DrawerContent';
const {width, height} = Dimensions.get('window');

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const activeTabColor = '#F5CF04';
const nonActiveTabColor = '#C4C4C4';
const backgroundTabColor = '#fff';

const AppStack = () => {
  const {userToken, userDetails} = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName={'Drawer'}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}></Stack.Screen>

      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const DrawerNavigator = ({navigation}) => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </Drawer.Navigator>
);

// const BottomTabNav = ({ navigation }) => (

//     <Tab.Navigator initialRouteName="Drawer"
//         screenOptions={{
//             keyboardHidesTabBar: true,
//             showLabel: false,
//             tabBarShowLabel: false,
//             tabBarStyle: {
//                 // position: 'absolute',
//                 // elevation: 5,
//                 backgroundColor: backgroundTabColor,
//                 borderTopWidth: 1,
//                 borderTopColor: "#f9f9f9",
//                 height: 60,
//             }
//         }}>
//         <Tab.Screen name="Drawer" component={DrawerNavigator}
//             options={{
//                 headerShown: false,
//                 tabBarIcon: ({ focused }) => {
//                     return (
//                         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                             <MaterialIcons name="home" size={25}
//                                 color={focused ? activeTabColor : nonActiveTabColor}
//                             ></MaterialIcons>
//                             {focused ?
//                                 <Text style={{
//                                     color: focused ? activeTabColor : nonActiveTabColor,
//                                     fontSize: 12
//                                 }}>Home</Text>
//                                 : null}
//                         </View>
//                     )
//                 },
//             }} />
//     </Tab.Navigator>
// )

const styles = StyleSheet.create({});
