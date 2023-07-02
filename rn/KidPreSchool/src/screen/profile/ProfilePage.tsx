import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import * as ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';

import { ProfilePageNavProps } from '~/navigators/RootNavigator';
import { selectUser } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

import HeaderProfile from './components/HeaderProfile';

const { width } = Dimensions.get('window');
const ProfilePage = () => {
  const [selectedValue, setSelectedValue] = useState('java');
  const pickerRef = useRef();
  const navigation = useNavigation<ProfilePageNavProps>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Manager', value: 'Manager' },
    { label: 'User', value: 'User' },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const dataUser = useSelector(selectUser);

  const [stringDate, setStringDate] = useState(date.toString().split('T')[0]);
  const includeExtra = true;
  const actionType = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  };

  const [response, setResponse] = React.useState<any>(null);
  // console.log(response.assets[0].uri);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, setResponse);
    } else {
      launchImageLibrary(options, setResponse);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('AccountUser');
      navigation.navigate('LoginPage');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  return (
    <View style={styles.container}>
      <HeaderProfile />
      <View>
        <View style={styles.avatar}>
          <TouchableOpacity
            style={styles.viewImage}
            onPress={() => onButtonPress(actionType.type, actionType.options)}>
            <FastImage
              style={styles.image}
              source={{
                uri:
                  response === null
                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/2048px-Faenza-avatar-default-symbolic.svg.png'
                    : response.assets[0].uri,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <Text style={styles.text}>Username</Text>
          <TextInput style={styles.input} defaultValue={dataUser.username} />
        </View>
        <View style={styles.name}>
          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.input} defaultValue={dataUser.email} />
        </View>

        <View style={styles.name}>
          <Text style={styles.text}>Birthday</Text>
          <TouchableOpacity
            style={styles.birth}
            onPress={() => setOpenDate(true)}>
            <Text>{stringDate}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDate}
            date={date}
            onConfirm={(date) => {
              setOpenDate(false);
              setStringDate(date.toString().split('T')[0]);
              // console.log(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
            mode={'date'}
          />
        </View>
        <View style={styles.drowdown}>
          <Text style={styles.text}>Role</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.picker}
          />
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.edit}>
          <Text style={styles.textEdit}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.textEdit}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  drowdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  input: {
    height: 40,
    width: width / 1.5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginRight: 12,
  },
  birth: {
    height: 40,
    width: width / 1.5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginRight: 12,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  picker: {
    height: 30,
    width: width / 1.5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginLeft: width / 5.6,
    // backgroundColor: 'red',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 4,
    backgroundColor: '#B0E0E6',
    width: 80,
    height: 80,
    borderRadius: 48,
  },
  image: {
    // backgroundColor: '#000000',
    width: width * 0.14,
    // height: width * 0.14,

    // margin: 50,
    aspectRatio: 1 / 1,
    margin: width * 0.02,
    // flex: 1,
    resizeMode: 'contain',
  },
  avatar: {
    marginTop: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    padding: 4,
    backgroundColor: '#42b883',
    borderRadius: 8,
    marginRight: 12,
  },
  logout: {
    padding: 4,
    backgroundColor: 'red',
    borderRadius: 8,
    marginLeft: 12,
  },
  textEdit: {
    margin: 4,
    marginLeft: 10,
    marginRight: 10,
    color: defaultTheme.colors.background,
    fontSize: 14,
    fontWeight: '900',
    // borderRadius: 12,
  },
  button: {
    marginTop: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfilePage;
