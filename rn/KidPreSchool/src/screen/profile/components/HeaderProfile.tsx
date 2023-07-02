import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import IconProfile from '~/asset/icon/IconProfile';
import { DataFull } from '~/data/DataFull';
import { DataMenu } from '~/data/DataMenu';
import { DataVideoMenu } from '~/data/DataVideoMenu';
import {
  AdminContainerPageNavProps,
  HomePageNavProps,
} from '~/navigators/RootNavigator';
import { selectIdHome, selectIdMenu } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const HeaderProfile = () => {
  const navigation = useNavigation<AdminContainerPageNavProps>();

  // console.log(actionButtonState.result?.dataField);

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <FastImage style={styles.image} source={getImage('btnback')} />
        </TouchableOpacity>
        <Text style={styles.text}>Profile</Text>
        <Text />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: defaultTheme.colors.default,
    // justifyContent: 'space-around'
    height: Platform.OS === 'ios' ? 70 : 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingTop: Platform.OS === 'ios' ? 16 : 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    // font: defaultTheme.fonts.regular,
    paddingRight: 24,
    color: defaultTheme.colors.headbar,
    marginTop: Platform.OS === 'ios' ? 24 : 0,
    marginRight: 20,
  },
  back: {
    marginTop: Platform.OS === 'ios' ? 24 : 0,
    // marginLeft: 32,
    paddingLeft: 8,
  },
  image: {
    height: 40,
    width: 40,
  },
});

export default HeaderProfile;
