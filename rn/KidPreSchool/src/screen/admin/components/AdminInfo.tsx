import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import IconInfo from '~/asset/icon/IconInfo';
import useModalManager from '~/hook/useModalManager';
import { defaultTheme } from '~/theme/theme';

const { width } = Dimensions.get('window');

const AdminInfo = (item: any) => {
  const { openModal } = useModalManager();
  const openModalInfo = ({ item }: { item: any }) => {
    // console.log(item?._id);
    // console.log(newArr);
    openModal('InfoUserModal', true, {
      user: item,
    });
  };
  return (
    <View style={styles.bgAdmin}>
      <View style={styles.name}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/2048px-Faenza-avatar-default-symbolic.svg.png',
          }}
        />
        <Text style={styles.text}>{item?.username}</Text>
      </View>
      <TouchableOpacity
        style={{ marginRight: 24 }}
        onPress={() => openModalInfo(item)}>
        <IconInfo width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bgAdmin: {
    backgroundColor: defaultTheme.colors.background,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20
    // margin: 16,
    borderRadius: 10,
    margin: 8,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
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
export default AdminInfo;
