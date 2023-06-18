import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { selectUser } from '~/redux/slice/selectors';

const Profile = () => {
  const dataUser = useSelector(selectUser);
  //   console.log(dataUser);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <View>
        <View style={styles.name}>
          <Text>Username</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.name}>
          <Text>Email</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  input: {
    height: 40,
    width: 280,
    backgroundColor: 'transparent',
  },
  // itemChips: {
  //   width: '30%',
  // },
});

export default Profile;
