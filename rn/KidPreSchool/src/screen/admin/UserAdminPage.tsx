import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import axios from 'axios';
import Header from '~/components/header/Header';
import { DataMenu } from '~/data/DataMenu';
import useModalManager from '~/hook/useModalManager';
import { ContentPageNavProps } from '~/navigators/ContentContainer';
import { ManagePageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';
import { selectUser } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const { width } = Dimensions.get('window');

const UserAdminPage = () => {
  const [data, setData] = useState(DataMenu);
  const dispatch = useDispatch();
  const { actions } = useKidsPreSchoolSlice();
  const navigation = useNavigation<ContentPageNavProps>();
  const { openModal } = useModalManager();
  const dataUser = useSelector(selectUser);
  const [dataAllUser, setDataAllUser] = useState([]);
  // console.log(typeof dataUser.accessToken);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${dataUser?.accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/users', config)
      .then(function (response) {
        // console.log(response.data);
        // console.log(response);
        setDataAllUser(response.data);
      })
      .catch(console.log);
  }, []);

  function removeObjectWithId(arr: any, id: number) {
    // Making a copy with the Array from() method
    const arrCopy = Array.from(arr);

    const objWithIdIndex = arrCopy.findIndex((obj: any) => obj.id === id);
    arrCopy.splice(objWithIdIndex, 1);
    return arrCopy;
  }
  const openModalBlock = () => {
    // console.log(item);
    // console.log(newArr);
    openModal('ExampleModal');
  };

  const renderItem = ({ item }: { item: LearningInFo }) => {
    // console.log(item);
    return (
      <TouchableOpacity style={styles.list}>
        <View style={styles.bgImage}>
          <View style={styles.name}>
            <FastImage
              style={styles.image}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/2048px-Faenza-avatar-default-symbolic.svg.png',
              }}
            />
            <Text style={styles.text}>{item.username}</Text>
          </View>
          <View style={styles.change}>
            {item?.isActive ? (
              <TouchableOpacity
                style={styles.edit}
                onPress={() => openModalBlock()}>
                <Text style={styles.textEdit}>Active</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.delete}>
                <Text style={styles.textEdit}>Block</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* <Text style={styles.text}>{item.tittle}</Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.container}>
        <ImageBackground resizeMode='cover' source={getImage('bgmain')}>
          <FlatList
            // horizontal={true}
            // columnWrapperStyle={styles.column}
            // showsHorizontalScrollIndicator={false}
            data={dataAllUser}
            renderItem={renderItem}
            // keyExtractor={(item) => item.name}
            // numColumns={2}
          />
        </ImageBackground>
        {/* <FastImage style={styles.image} source={getImage('alphabet')} /> */}
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
  },
  list: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
    // flexDirection: 'row',
    marginTop: 12,
    marginRight: 8,
    marginLeft: 8,
  },
  bgImage: {
    backgroundColor: defaultTheme.colors.background,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20
    // margin: 16,
    borderRadius: 10,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    marginRight: 12,
  },
  edit: {
    backgroundColor: '#42b883',
    borderRadius: 8,
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
  delete: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    marginLeft: 12,
  },
  column: {
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
  image: {
    // backgroundColor: '#000000',
    width: width * 0.16,
    // height: width * 0.14,

    // margin: 50,
    aspectRatio: 1 / 1,
    margin: width * 0.02,
    // flex: 1,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginLeft: 8,
    // backgroundColor: 'red',
  },
});
export default UserAdminPage;
