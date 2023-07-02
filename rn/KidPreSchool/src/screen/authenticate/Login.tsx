import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { createRef, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import getImage from '~/libs/getImage';

import axios from 'axios';
import Loader from '~/components/load/Loader';
import { LoginPageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';
import { defaultTheme } from '~/theme/theme';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const navigation = useNavigation<LoginPageNavProps>();
  const { actions } = useKidsPreSchoolSlice();
  const passwordInputRef = createRef();
  const dispatch = useDispatch();
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill User Name');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    const dataToSend = { username: userName, password: userPassword };
    const data = JSON.stringify(dataToSend);
    // console.log('data', data);
    // let formBody = [];
    // for (const key in dataToSend) {
    //   const encodedKey = encodeURIComponent(key);
    //   const encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('http://localhost:8800/api/auth/login', {
    //   method: 'POST',
    //   mode: 'cors',
    //   body: data,
    //   // headers: {
    //   //   //Header Defination
    //   //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   // },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log('data:', responseJson);
    //     // If server response message same as Data Matched
    //     // if (responseJson.status === 'success') {
    //     //   // AsyncStorage.setItem('user_id', responseJson.data.email);
    //     //   console.log(responseJson.data.email);
    //     //   // navigation.replace('DrawerNavigationRoutes');
    //     // } else {
    //     //   setErrortext(responseJson.msg);
    //     //   console.log('Please check your email id or password');
    //     // }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
    axios
      .post('http://localhost:8800/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        // console.log(response.data.isAdmin);
        dispatch(actions.changeDataUser(response.data));
        const userAccount = JSON.stringify(response.data);
        AsyncStorage.setItem('AccountUser', userAccount);
        if (response.data.isAdmin) {
          navigation.navigate('AdminContainerPage');
        } else if (response.data.isManager) {
          navigation.navigate('ManagePage');
        } else {
          navigation.navigate('HomePage');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={getImage('logo')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserName(UserEmail)}
                placeholder='Enter Username' //dummy@abc.com
                placeholderTextColor='#8b9cb5'
                autoCapitalize='none'
                // keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid='#f000'
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder='Enter Password' //12345
                placeholderTextColor='#8b9cb5'
                keyboardType='default'
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid='#f000'
                returnKeyType='next'
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterPage')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5dc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#8b9cb5',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#7DE24E',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default Login;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
