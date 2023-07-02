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
import IconInfo from '~/asset/icon/IconInfo';
import Header from '~/components/header/Header';
import { DataMenu } from '~/data/DataMenu';
import useModalManager from '~/hook/useModalManager';
import { ContentPageNavProps } from '~/navigators/ContentContainer';
import { ManagePageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';
import { selectUser } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

import AdminInfo from './components/AdminInfo';
import HeaderAdmin from './components/HeaderAdmin';
import ManagerInfo from './components/ManagerInfo';

const { width } = Dimensions.get('window');

const UserAdminPage = () => {
  const [data, setData] = useState(DataMenu);
  const dispatch = useDispatch();
  const { actions } = useKidsPreSchoolSlice();
  const navigation = useNavigation<ContentPageNavProps>();
  const { openModal } = useModalManager();
  const dataUser = useSelector(selectUser);
  const [dataAllUser, setDataAllUser] = useState([]);
  const [dataUserAdmin, setDataUserAdmin] = useState({});
  const [dataUserManager, setDataUserManager] = useState([]);

  // console.log(typeof dataUser.accessToken);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${dataUser?.accessToken}`,
    },
  };

  const openModalInfo = (item: any) => {
    // console.log(item?._id);
    // console.log(item);
    openModal('InfoUserModal', true, {
      user: item,
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/users', config)
      .then(function (response) {
        // console.log(response.data);
        const dataAdmin = response.data.filter(
          (item: any) => item?.isAdmin === true,
        );
        const dataManager = response.data.filter(
          (item: any) => item?.isManager === true,
        );
        const dataUser = response.data.filter(
          (item: any) => item?.isManager === false && item?.isAdmin === false,
        );
        // console.log(dataManager);
        setDataAllUser(dataUser);
        setDataUserAdmin(dataAdmin[0]);
        setDataUserManager(dataManager);
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
  const openModalBlock = (item: any) => {
    // console.log(item);
    // console.log(item?._id);
    // console.log(newArr);
    openModal('ExampleModal', true, {
      user: item,
    });
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
                onPress={() => openModalBlock(item)}>
                <Text style={styles.textEdit}>Active</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.delete}
                onPress={() => openModalBlock(item)}>
                <Text style={styles.textEdit}>Block</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => openModalInfo(item)}>
              <IconInfo width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={styles.text}>{item.tittle}</Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderAdmin />

      <SafeAreaView style={styles.container}>
        <ImageBackground resizeMode='cover' source={getImage('bgmain')}>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.textName}>Admin</Text>
            <AdminInfo item={dataUserAdmin} />
          </View>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.textName}>Manager</Text>
            {dataUserManager.map((item: any) => {
              return <ManagerInfo item={item} />;
            })}
          </View>
          <Text style={styles.textName}>User</Text>
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
    </View>
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
  textName: {
    fontSize: 20,
    fontWeight: '700',
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
    marginRight: 12,
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
    // marginLeft: 12,
    marginRight: 12,
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
