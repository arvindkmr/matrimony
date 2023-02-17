import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PixelRatio,
  TextInput,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {AuthContext} from '../../navigation/AuthProvider';
import BaseScreen from '../../components/BaseScreen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import moment from 'moment/moment';
import Swiper from 'react-native-swiper';
import axios from 'react-native-axios';
import Share from 'react-native-share';
const themeColor = '#F5CF04';

const Data = [
  {
    id: 1,
    title: 'Add Wallet',
    img: require('../../assets/icons/box.png'),
    route: 'AddMoney',
    backgroundColor: '#eec8bf',
  },
  {
    id: 2,
    title: 'Earn Money',
    img: require('../../assets/icons/safe.png'),
    route: 'AmountLocker',
  },
  {
    id: 3,
    title: 'Personal Finance',
    img: require('../../assets/icons/loan.png'),
    route: 'AmountLocker',
  },
  {
    id: 4,
    title: 'Refer and Earn',
    img: require('../../assets/icons/application.png'),
    route: 'ReferandEarn',
  },
];

const HomeScreen = ({navigation, route}) => {
  return (
    <BaseScreen
      logo={
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              // fontSize: 22,
              fontSize: PixelRatio.getPixelSizeForLayoutSize(8.5),
              color: '#8B0000',
              fontFamily: 'Roboto-Bold',
            }}>
            Matrimony
          </Text>
        </TouchableOpacity>
      }
      renderChild={Content({navigation, route})}
      navigation={navigation}
      leftButton={'menu'}
      paddingTop={false}
      paddingHorizontal={true}
      rightButton={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <MaterialIcons name="person" size={25} color={'#000'}></MaterialIcons>
        </TouchableOpacity>
      }
    />
  );
};

const Item = ({title}) => (
  <View style={{}}>
    <Text style={{}}>{title}</Text>
  </View>
);
const Content = ({navigation, route}) => {
  // const { BaseUrl, appData, userDetails } = useContext(AuthContext)

  const [referrals, setReferrals] = useState();
  const {BaseUrl, userToken} = useContext(AuthContext);

  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();

  const referallcode = mobile;
  const myRefferalshare = async () => {
    const shareOptions = {
      message: `Hey , This is my referral Code: ${referallcode}`,
    };
    try {
      console.log(shareOptions);
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <ScrollView
      style={styles.contentScroll}
      // justifyContent='center'
    >
      <View style={styles.container}></View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  referandearncontainer: {
    flex: 1,
    top: 20,
  },
  refertxt: {
    color: '#8B0000',
    fontSize: 24,
    fontFamily: 'Montserrat',
    lineHeight: 29.26,
    textAlign: 'center',
  },
  CodeContainer: {
    marginHorizontal: 37,
    width: '80%',
    height: 45,

    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
