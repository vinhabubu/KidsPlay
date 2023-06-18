import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import Header from '~/components/header/Header';
import { SettingDetailPageNavProps } from '~/navigators/SettingContainer';

const Setting = () => {
  const navigation = useNavigation<SettingDetailPageNavProps>();
  return (
    <SafeAreaView style={styles.detaiInfor}>
      <View style={styles.info}>
        <View style={styles.avatar}>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailInfor}>
          <Text style={styles.name}>Andrew Ainsley</Text>
          <Text style={styles.gmail}>@andrew_ainsley</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfilePage')}
        style={styles.edit}>
        <Text style={styles.title}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detaiInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  detailInfor: {
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
  },
  gmail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#616161',
  },
  edit: {
    backgroundColor: '#fff176',
    borderRadius: 8,
  },
  title: {
    padding: 6,
    // color: '#FFFFFF',
    fontWeight: '700',
  },
  // itemChips: {
  //   width: '30%',
  // },
});

export default Setting;
