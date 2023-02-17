import React, {useContext, useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import axios from 'react-native-axios';

import {AuthContext} from '../navigation/AuthProvider';

const iconColor = '#F5CF04';
const fontSize = 24;

const DrawerContent = props => {
  const {navigation} = props;

  const [name, setName] = useState();
  const [mobile, setMobile] = useState();

  const getDetails = async () => {
    let form = new FormData();

    form.append('cust_id', userToken);

    await axios
      .post(BaseUrl + '/get_customer_details', form, {
        headers: {'Content-type': 'multipart/form-data'},
      })
      .then(response => {
        console.log(response.data, 'subject api');
        if (response.data.status === 200) {
          // setProfile(response.data.msg)

          setName(response.data.msg.cust_name);
          setMobile(response.data.msg.cust_mobile);
        }
      })
      .catch(error => {
        console.log(error, 'error while fetching getcart api');
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const {
    user,
    userToken,
    userDetails,
    userType,
    setUserToken,
    mainBalance,
    BaseUrl,
    logout,
    stores,
    setStores,
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userContent}>
          <View style={styles.profileDetailsRow}>
            <View style={styles.imgWrapper}>
              {/* {
                                userDetails.avatar ?
                                    <Image source={{ uri: userDetails.avatar }} style={styles.profileImg}></Image>
                                    : null
                            } */}
              <MaterialIcons
                name="person-outline"
                size={44}
                color={'#B0ACAC'}
                style={{position: 'absolute', zIndex: 1}}></MaterialIcons>
            </View>
            <View style={styles.detailWrapper}>
              <Text style={styles.userName}>{name}</Text>

              <TouchableOpacity
                style={[
                  styles.settingsBtn,
                  {width: 150, height: 20, paddingLeft: 0, marginBottom: 0},
                ]}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Text
                  style={[
                    styles.solidBtnTxt,
                    {color: '#000', marginLeft: 0, fontWeight: '500'},
                  ]}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Home */}
        <DrawerItem
          style={{height: 45, borderBottomWidth: 0, borderBottomColor: '#fff'}}
          labelStyle={{fontFamily: 'Roboto-Medium', color: '#000'}}
          icon={({color, size, focused}) => (
            <MaterialIcons name="home" color={'#000'} size={fontSize} />
          )}
          label="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}></DrawerItem>
        {/* Profile */}
        <DrawerItem
          style={{height: 45, borderBottomWidth: 0, borderBottomColor: '#fff'}}
          labelStyle={{fontFamily: 'Roboto-Medium', color: '#000'}}
          icon={({color, size, focused}) => (
            <MaterialIcons name="person" color={'#000'} size={fontSize} />
          )}
          label="Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}></DrawerItem>

        {/* Notifications */}
        {/* <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ fontFamily: "Roboto-Medium", }}
                    icon={({ color, size, focused }) => (
                        <MaterialIcons name="notifications" color={'#555'} size={fontSize} />
                    )}
                    label="Notifications"
                    onPress={() => { navigation.navigate('Notifications') }}>
                </DrawerItem> */}

        {/* Term&Privacy */}
        {/* <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ fontFamily: "Roboto-Medium", }}
                    icon={({ color, size, focused }) => (
                        <MaterialIcons name="security" color={'#555'} size={fontSize} />
                    )}
                    label="Privacy"
                    onPress={() => { navigation.navigate('') }}>
                </DrawerItem> */}

        {/* contact us */}
        <DrawerItem
          style={{height: 45, borderBottomWidth: 0, borderBottomColor: '#fff'}}
          labelStyle={{fontFamily: 'Roboto-Medium', color: '#000'}}
          icon={({color, size, focused}) => (
            <MaterialIcons
              name="support-agent"
              color={'#000'}
              size={fontSize}
            />
          )}
          label="Contact Us"
          onPress={() => {
            navigation.navigate('Term and Privacy');
          }}></DrawerItem>

        {/* Policy */}
        {/* <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ fontFamily: "Roboto-Medium", }}
                    icon={({ color, size, focused }) => (
                        <MaterialIcons name="policy" color={'#555'} size={fontSize} />
                    )}
                    label="Privacy and Policy"
                    onPress={() => { navigation.navigate('Privacy') }}>
                </DrawerItem> */}

        {/* Settings */}
        {/* <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ fontFamily: "Roboto-Medium", }}
                    icon={({ color, size, focused }) => (
                        <MaterialIcons name="settings" color={'#555'} size={fontSize} />
                    )}
                    label="Term and Conditions"
                    onPress={() => { navigation.navigate('Term and Privacy') }}>
                </DrawerItem> */}

        {/* Refer and Earn   */}

        <DrawerItem
          style={{height: 45, borderBottomWidth: 0, borderBottomColor: '#fff'}}
          labelStyle={{fontFamily: 'Roboto-Medium', color: '#000'}}
          icon={({color, size}) => (
            <AntDesign name="addusergroup" color={'#000'} size={fontSize} />
          )}
          label="Refer and Earn "
          onPress={() => {
            navigation.navigate('Home');
          }}></DrawerItem>
        {/* Refferal List */}
        {/* <DrawerItem
                      style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                      labelStyle={{ fontFamily: "Roboto-Medium", color: '#000' }}
                    icon={({ color, size }) => (
                        <MaterialIcons name="list"
                            color={'#000'}
                            size={fontSize} />
                    )}
                    label="Refer List "
                    onPress={() => { navigation.navigate('ReferralList') }}
                >
                </DrawerItem> */}
      </DrawerContentScrollView>

      <DrawerItem
        style={{height: 45, borderBottomWidth: 0, borderBottomColor: '#fff'}}
        labelStyle={{fontFamily: 'Roboto-Medium', color: '#000'}}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="exit-to-app"
            color={'#000'}
            size={fontSize}
          />
        )}
        label="Sign Out"
        onPress={() => logout()}></DrawerItem>

      <Text style={styles.version}>Version 1.0</Text>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userContent: {
    display: 'flex',
    // justifyContent:'center',

    alignItems: 'center',
    paddingTop: 25,
    paddingLeft: 15,
    marginBottom: 30,
    // borderWidth:1
  },
  profileDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
    // borderWidth: 1,
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'relative',
  },
  profileImg: {
    // resizeMode: 'contain',
    width: 65,
    height: 65,
    zIndex: 2,
    borderRadius: 35,
  },

  detailWrapper: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  userName: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },
  solidBtnTxt: {
    fontSize: 14,
    color: '#000',
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
  },
  version: {
    fontSize: 12,
    color: '#555',
    marginLeft: 20,
    fontFamily: 'Roboto-Medium',
    // textAlign:'center'
  },
});
