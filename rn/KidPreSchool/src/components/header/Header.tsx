import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';

import getImage from '~/libs/getImage';

import { defaultTheme } from '~/theme/theme';

const Header = () => {
  const navigation = useNavigation();

  // console.log(actionButtonState.result?.dataField);
  const [title, setTitle] = useState('');
  const router = useRoute();
  useEffect(() => {
    if (router.name === 'HomePage') {
      setTitle('Kids Play');
    }
    if (router.name === 'ShareMenuPage') {
      setTitle('Preschool Kids Learning');
    }
  }, [router]);

  return (
    <View>
      {router.name === 'HomePage' ? (
        <View style={styles.container}>
          <Text />
          <Text style={styles.textHome}>{title}</Text>
          <FastImage style={styles.image} source={getImage('setting')} />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FastImage style={styles.image} source={getImage('btnback')} />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
          <Text />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: defaultTheme.colors.default,
    // justifyContent: 'space-around'
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 24,
    color: '#006400',
  },
  textHome: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 28,
    color: '#006400',
  },
  image: {
    height: 40,
    width: 40,
  },
});

export default Header;
